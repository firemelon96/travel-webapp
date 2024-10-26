import { ReactNode } from 'react';
import { AppSidebar } from './_components/app-side-bar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Navbar } from './_components/nav-bar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
