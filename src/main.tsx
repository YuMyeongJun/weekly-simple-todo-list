import { Routers } from '@routers';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@modules';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={'...loading'}>
      <RouterProvider router={Routers} />
    </Suspense>
  </QueryClientProvider>,
);
