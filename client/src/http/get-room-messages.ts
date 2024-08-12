type GetRoomMessagesRequest = {
  roomId: string;
};

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest) {
  const response = await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages`);

  const data: Array<{
    id: string;
    room_id: string;
    message: string;
    reaction_count: number;
    answered: boolean;
  }> = await response.json();

  return {
    messages: data.map((message) => ({
      id: message.id,
      text: message.message,
      reactionCount: message.reaction_count,
      answered: message.answered,
    })),
  };
}
