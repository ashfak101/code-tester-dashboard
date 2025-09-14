'use client';

import { ProblemEditor } from '@/components/problem-editor';
import React from 'react';

const CreatePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='flex'>
        <main className='flex-1 p-6'>
          <div className='max-w-7xl mx-auto'>
            <div className='mb-8'>
              <div className='flex items-center gap-4 mb-4'>
                <h1 className='text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  Problem Editor
                </h1>

              </div>

            </div>
            <ProblemEditor />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePage;
