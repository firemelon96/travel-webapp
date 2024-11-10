import { ReactNode } from 'react';
import { Navigation } from './components/navigation';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
};

export default PublicLayout;
