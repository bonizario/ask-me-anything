import { queryClient } from '@/libs';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CreateRoomPage, RoomPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoomPage />,
  },
  {
    path: '/room/:roomId',
    element: <RoomPage />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster theme="dark" richColors />
    </QueryClientProvider>
  );
}
