type CreateRoomRequest = {
  theme: string;
};

type RawResponse = {
  id: string;
};

export async function createRoom({ theme }: CreateRoomRequest) {
  const response = await fetch(`${import.meta.env['VITE_API_URL']}/rooms`, {
    method: 'POST',
    body: JSON.stringify({ theme }),
  });

  const data: RawResponse = await response.json();

  return { roomId: data.id };
}
