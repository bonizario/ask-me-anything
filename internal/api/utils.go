package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/bonizario/ask-me-anything/internal/store/pgstore"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

// retrieves a room by its ID from the request URL and returns it along with the parsed room ID
func (h apiHandler) readRoom(
	w http.ResponseWriter,
	r *http.Request,
) (room pgstore.Room, rawRoomID string, roomID uuid.UUID, ok bool) {
	rawRoomID = chi.URLParam(r, "room_id")

	roomID, err := uuid.Parse(rawRoomID)
	if err != nil {
		http.Error(w, "invalid room id", http.StatusBadRequest)
		return pgstore.Room{}, "", uuid.UUID{}, false
	}

	room, err = h.q.GetRoom(r.Context(), roomID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, fmt.Sprintf("room with ID %s not found", roomID), http.StatusNotFound)
			return pgstore.Room{}, "", uuid.UUID{}, false
		}

		slog.Error(fmt.Sprintf("failed to get room with ID %s", roomID), "error", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return pgstore.Room{}, "", uuid.UUID{}, false
	}

	return room, rawRoomID, roomID, true
}

// writes a JSON response to the client
func sendJSON(w http.ResponseWriter, rawData any) {
	data, err := json.Marshal(rawData)
	if err != nil {
		slog.Error("failed to encode data", "error", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	_, err = w.Write(data)
	if err != nil {
		slog.Error("failed to write response", "error", err)
		return
	}
}
