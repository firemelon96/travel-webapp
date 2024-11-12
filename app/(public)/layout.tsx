import { ReactNode } from 'react';
import { Navigation } from './components/navigation';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from 'sonner';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <main>
        <Navigation />
        {children}
        <Toaster />
      </main>
    </QueryProvider>
  );
};

export default PublicLayout;
