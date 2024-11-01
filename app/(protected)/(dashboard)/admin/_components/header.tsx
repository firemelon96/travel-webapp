import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { Profile } from './profile';
import { auth } from '@/auth';

export const Header = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  console.log(session);

  return (
    <SidebarInset>
      <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#'>
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='ml-auto'>
          <Profile
            src={session?.user?.image || ''}
            name={session?.user?.name || 'TT'}
          />
        </div>
      </header>
      {children}
    </SidebarInset>
  );
};
