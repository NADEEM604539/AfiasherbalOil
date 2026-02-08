'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function SignInCatchAll() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323]">
      <div className="w-full max-w-md">
        <SignIn
          path="/sign-in"
          routing="path"
          redirectUrl={redirectUrl}
          appearance={{
            elements: {
              card: 'bg-[#1B2F20] border border-green-700',
              headerTitle: 'text-green-100',
              headerSubtitle: 'text-green-300',
              socialButtonsBlockButton: 'bg-green-700 hover:bg-green-600 text-white',
              formFieldInput: 'bg-[#0F1C13] border-green-700 text-green-200',
              formFieldLabel: 'text-green-300',
              footerActionLink: 'text-green-400 hover:text-green-300',
              dividerLine: 'bg-green-700',
              dividerText: 'text-green-400',
            },
          }}
        />
      </div>
    </div>
  );
}
