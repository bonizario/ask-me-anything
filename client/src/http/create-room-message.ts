type CreateRoomMessageRequest = {
  roomId: string;
  message: string;
};

export async function createRoomMessage({ roomId, message }: CreateRoomMessageRequest) {
  const response = await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  const data: { id: string } = await response.json();

  return { messageId: data.id };
}
