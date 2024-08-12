export type GetRoomMessagesRequest = {
  roomId: string;
};

export type GetRoomMessagesResponse = {
  messages: {
    id: string;
    text: string;
    reactionCount: number;
    answered: boolean;
  }[];
};

type RawResponse = {
  id: string;
  room_id: string;
  message: string;
  reaction_count: number;
  answered: boolean;
}[];

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(`${import.meta.env['VITE_API_URL']}/rooms/${roomId}/messages`);

  const data: RawResponse = await response.json();

  return {
    messages: data.map((message) => ({
      id: message.id,
      text: message.message,
      reactionCount: message.reaction_count,
      answered: message.answered,
    })),
  };
}
