'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/auth/user-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut, useSession } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/' },

];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Code className='h-6 w-6' />
            <span className='hidden font-bold sm:inline-block'>
              LeetCode Dashboard
            </span>
          </Link>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='mr-2 px-0 text-base md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='pr-0'>
            <Link href='/' className='flex items-center space-x-2'>
              <Code className='h-6 w-6' />
              <span className='font-bold'>LeetCode Dashboard</span>
            </Link>
            <nav className='mt-6 flex flex-col space-y-3'>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1 text-lg ${
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  }`}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <div className='h-9 w-full'></div>
          </div>
          <UserMenu />
          {session && (
            <Button variant='outline' size='sm' onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
