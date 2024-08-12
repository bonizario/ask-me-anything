import amaLogo from '@/assets/ama-logo.svg';
import { Button } from '@/components';
import { Share2 } from 'lucide-react';
import { Suspense, type MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CreateRoomMessageForm } from './components/create-room-message-form';
import { Messages } from './components/messages';

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
          Room ID: <span className="lowercase text-zinc-300">{roomId}</span>
        </span>

        <Button intent="secondary" type="button" onClick={handleShareRoom}>
          Share <Share2 className="size-4" />
        </Button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <CreateRoomMessageForm />

      <Suspense fallback={<p>Loading...</p>}>
        <Messages />
      </Suspense>
    </main>
  );
}
