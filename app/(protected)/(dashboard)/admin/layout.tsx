import { ReactNode } from 'react';
import { AppSidebar } from './_components/app-side-bar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Header } from './_components/header';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <Header>
          <main className='w-full'>{children}</main>
        </Header>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
