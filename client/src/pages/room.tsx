import amaLogo from '@/assets/ama-logo.svg';
import { Button, Message } from '@/components';
import { ArrowRight, Share2 } from 'lucide-react';
import type { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function RoomPage() {
  const { roomId } = useParams();

  const handleShareRoom: MouseEventHandler<HTMLButtonElement> = () => {
    const url = window.location.href.toString();

    if (navigator?.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Room URL copied to clipboard');
    }
  };

  return (
    <main className="flex w-full max-w-[40rem] flex-col gap-6 self-center px-4 py-10">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="Ask Me Anything Logo" className="h-5 shrink-0" />

        <span className="flex-1 truncate text-sm text-zinc-500">
          Código da sala: <span className="lowercase text-zinc-300">{roomId}</span>
        </span>

        <Button intent="secondary" type="button" onClick={handleShareRoom}>
          Compartilhar <Share2 className="size-4" />
        </Button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <form className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-900 focus-within:ring-1">
        <input
          type="text"
          name="theme"
          placeholder="What is your question?"
          autoComplete="off"
          className="mx-2 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
        />
        <Button type="submit">
          Create question
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <ol className="flex list-outside list-decimal flex-col gap-8 px-3">
        <Message
          text="O que é GoLang e quais são suas principais vantagens em comparação com outras linguagens de programação como Python, Java ou C++?"
          reactionCount={100}
        />
        <Message
          answered
          text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
          reactionCount={50}
        />
        <Message
          text="Quais são as melhores práticas para organizar o código em um projeto GoLang, incluindo pacotes, módulos e a estrutura de diretórios?"
          reactionCount={25}
        />
      </ol>
    </main>
  );
}
