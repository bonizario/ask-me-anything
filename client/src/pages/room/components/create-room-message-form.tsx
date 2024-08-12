import { Button } from '@/components';
import { useRoomId } from '@/hooks';
import { createRoomMessage } from '@/http';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function CreateRoomMessageForm() {
  const roomId = useRoomId();

  const createRoomMessageAction = async (data: FormData) => {
    const message = data.get('message')?.toString();

    if (!message) {
      return;
    }

    try {
      await createRoomMessage({ roomId, message });
    } catch {
      toast.error('Could not create question');
    }
  };

  return (
    <form
      action={createRoomMessageAction}
      className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-900 focus-within:ring-1"
    >
      <input
        autoComplete="off"
        className="mx-2 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
        name="message"
        placeholder="What is your question?"
        required
        type="text"
      />
      <Button type="submit">
        Create question
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
