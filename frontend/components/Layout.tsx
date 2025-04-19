// app/layout.tsx
import { ReactNode } from 'react';
import SliderWrapper from '@/components/SliderWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SliderWrapper />
      </body>
    </html>
  );
}