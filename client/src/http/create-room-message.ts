type CreateRoomMessageRequest = {
  roomId: string;
  message: string;
};

type RawResponse = {
  id: string;
};

export async function createRoomMessage({ roomId, message }: CreateRoomMessageRequest) {
  const response = await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  const data: RawResponse = await response.json();

  return { messageId: data.id };
}
