import { ProblemList } from '@/components/problem-list';
import React from 'react';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='flex'>
        <div className='container mx-auto'>
          <ProblemList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
