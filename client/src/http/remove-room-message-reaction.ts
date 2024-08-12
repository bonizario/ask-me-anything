type RemoveRoomMessageReactionRequest = {
  roomId: string;
  messageId: string;
};

export async function removeRoomMessageReaction({
  roomId,
  messageId,
}: RemoveRoomMessageReactionRequest) {
  await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'DELETE',
  });
}
