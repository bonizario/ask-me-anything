import { ArrowUp } from 'lucide-react';
import { type MouseEventHandler, useState } from 'react';

type MessageProps = {
  reactionCount: number;
  text: string;
  answered?: boolean;
};

export function Message({ reactionCount, text, answered = false }: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  const handleReactToMessage: MouseEventHandler<HTMLButtonElement> = () => {
    setHasReacted((prev) => !prev);
  };

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:pointer-events-none data-[answered=true]:opacity-50"
    >
      {text}
      <button
        type="button"
        data-reacted={hasReacted}
        className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-300 data-[reacted=true]:text-orange-400 data-[reacted=true]:hover:text-orange-500"
        onClick={handleReactToMessage}
      >
        <ArrowUp className="size-4" />
        Like question ({reactionCount})
      </button>
    </li>
  );
}
