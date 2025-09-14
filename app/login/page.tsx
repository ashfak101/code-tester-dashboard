
import LoginContent from '@/components/auth/login-content'
import { Suspense } from 'react';


export default function LoginPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
    </Suspense>
  );
}
