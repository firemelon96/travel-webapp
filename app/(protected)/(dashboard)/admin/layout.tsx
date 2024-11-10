import { ReactNode } from 'react';
import { AppSidebar } from './_components/app-side-bar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Header } from './_components/header';
import { SheetProvider } from '@/providers/sheet-provider';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/providers/query-provider';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <Header>
          <SheetProvider />
          <main className='w-full'>{children}</main>
          <Toaster />
        </Header>
      </SidebarProvider>
    </QueryProvider>
  );
};

export default DashboardLayout;
