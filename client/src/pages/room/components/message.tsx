import { useRoomId } from '@/hooks';
import { createRoomMessageReaction, removeRoomMessageReaction } from '@/http';
import { cn } from '@/utils';
import { ArrowUp } from 'lucide-react';
import { ComponentPropsWithRef, useState } from 'react';
import { toast } from 'sonner';

type MessageProps = {
  id: string;
  reactionCount: number;
  text: string;
  answered?: boolean;
};

export function Message({ id: messageId, reactionCount, text, answered = false }: MessageProps) {
  const roomId = useRoomId();

  const [isReacted, setIsReacted] = useState(false);

  const createRoomMessageReactionAction = async () => {
    try {
      await createRoomMessageReaction({ roomId, messageId });
      setIsReacted(true);
    } catch {
      toast.error('Failed to like the question');
    }
  };

  const removeRoomMessageReactionAction = async () => {
    try {
      await removeRoomMessageReaction({ roomId, messageId });
      setIsReacted(false);
    } catch {
      toast.error('Failed to remove like from the question');
    }
  };

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:pointer-events-none data-[answered=true]:opacity-50"
    >
      {text}

      <ReactButton
        isReacted={isReacted}
        onClick={isReacted ? removeRoomMessageReactionAction : createRoomMessageReactionAction}
        reactionCount={reactionCount}
      />
    </li>
  );
}

interface ReactButtonProps extends ComponentPropsWithRef<'button'> {
  isReacted: boolean;
  reactionCount: number;
}

function ReactButton({ isReacted, reactionCount, ...props }: ReactButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'flex items-center gap-2 text-sm font-medium transition-colors',
        isReacted ? 'text-orange-400 hover:text-orange-500' : 'text-zinc-400 hover:text-zinc-300',
      )}
    >
      <ArrowUp className="size-4" />
      Like question ({reactionCount})
    </button>
  );
}
