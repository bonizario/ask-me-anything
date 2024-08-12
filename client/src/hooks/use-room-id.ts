import { useParams } from 'react-router-dom';

/**
 * Gets the room ID from the `URL` path parameters.
 */
export function useRoomId() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error('useRoomId must be used within a room page');
  }

  return roomId;
}
