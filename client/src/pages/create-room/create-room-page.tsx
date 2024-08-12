import amaLogo from '@/assets/ama-logo.svg';
import { Button } from '@/components/button';
import { createRoom } from '@/http';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function CreateRoomPage() {
  const navigate = useNavigate();

  const handleCreateRoom = async (data: FormData) => {
    const theme = data.get('theme')?.toString();

    if (!theme) {
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });

      navigate(`/room/${roomId}`);
    } catch {
      toast.error(' Could not create room');
    }
  };

  return (
    <main className="flex h-screen items-center justify-center px-4">
      <div className="flex max-w-[28.125rem] flex-col gap-6">
        <img src={amaLogo} alt="Ask Me Anything Logo" className="h-10 shrink-0" />

        <p className="text-center leading-relaxed text-zinc-300">
          Create a public AMA (Ask me anything) room and prioritize the most important questions for
          the community.
        </p>

        <form
          action={handleCreateRoom}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-900 focus-within:ring-1"
        >
          <input
            autoComplete="off"
            className="mx-2 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
            name="theme"
            placeholder="Room theme"
            required
            type="text"
          />
          <Button type="submit">
            Create room
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </main>
  );
}
