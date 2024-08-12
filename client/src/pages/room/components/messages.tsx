import { useMessagesWebSocket, useRoomId } from '@/hooks';
import { getRoomMessages } from '@/http';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Message } from './message';

export function Messages() {
  const roomId = useRoomId();

  const { data } = useSuspenseQuery({
    queryKey: ['room-messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebSocket();

  const sortedMessages = data.messages.sort((a, b) => b.reactionCount - a.reactionCount);

  return (
    <ol className="flex list-outside list-decimal flex-col gap-8 px-3">
      {sortedMessages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          answered={message.answered}
          reactionCount={message.reactionCount}
          text={message.text}
        />
      ))}
    </ol>
  );
}
