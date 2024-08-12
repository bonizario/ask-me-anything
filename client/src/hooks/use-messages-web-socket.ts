import { GetRoomMessagesResponse } from '@/http';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRoomId } from './use-room-id';

type WebSocketMessage =
  | { kind: 'message_answered'; value: { id: string } }
  | { kind: 'message_created'; value: { id: string; message: string } }
  | { kind: 'message_reaction_decreased'; value: { id: string; count: number } }
  | { kind: 'message_reaction_increased'; value: { id: string; count: number } };

/**
 * Establishes a WebSocket connection to listen for `message` events.
 *
 * Updates the `ReactQuery` messages cache accordingly.
 */
export function useMessagesWebSocket() {
  const roomId = useRoomId();

  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onopen = () => {
      console.log('WebSocket Client Connected to room', roomId);
    };

    ws.onclose = () => {
      console.log('WebSocket Client Disconnected from room', roomId);
    };

    ws.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);

      switch (data.kind) {
        case 'message_answered':
          queryClient.setQueryData<GetRoomMessagesResponse>(['room-messages', roomId], (state) => {
            if (!state) {
              return state;
            }

            return {
              messages: state.messages.map((message) => {
                if (message.id === data.value.id) {
                  return { ...message, answered: true };
                }

                return message;
              }),
            };
          });
          break;
        case 'message_created':
          queryClient.setQueryData<GetRoomMessagesResponse>(['room-messages', roomId], (state) => ({
            messages: [
              ...(state?.messages ?? []),
              { id: data.value.id, text: data.value.message, reactionCount: 0, answered: false },
            ],
          }));
          break;
        case 'message_reaction_decreased':
        case 'message_reaction_increased':
          queryClient.setQueryData<GetRoomMessagesResponse>(['room-messages', roomId], (state) => {
            if (!state) {
              return state;
            }

            return {
              messages: state.messages.map((message) => {
                if (message.id === data.value.id) {
                  return { ...message, reactionCount: data.value.count };
                }

                return message;
              }),
            };
          });
          break;
      }
    };

    return () => ws.close();
  }, [queryClient, roomId]);
}
