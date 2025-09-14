'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, User, Code, Book } from 'lucide-react';

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant='outline' size='sm' asChild>
        <Link href='/login'>Login</Link>
      </Button>
    );
  }

  const initials = session.user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            {session.user?.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name || ''}
              />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium'>{session.user?.name}</p>
            <p className='text-xs text-muted-foreground'>
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href='/profile'
            className='cursor-pointer flex w-full items-center'>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href='/problems'
            className='cursor-pointer flex w-full items-center'>
            <Code className='mr-2 h-4 w-4' />
            <span>My Problems</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href='/submissions'
            className='cursor-pointer flex w-full items-center'>
            <Book className='mr-2 h-4 w-4' />
            <span>Submissions</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href='/settings'
            className='cursor-pointer flex w-full items-center'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-600 focus:text-red-600'
          onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
