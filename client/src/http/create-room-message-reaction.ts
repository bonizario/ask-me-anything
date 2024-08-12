type CreateRoomMessageReactionRequest = {
  roomId: string;
  messageId: string;
};

export async function createRoomMessageReaction({
  roomId,
  messageId,
}: CreateRoomMessageReactionRequest) {
  await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'PATCH',
  });
}
