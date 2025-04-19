// components/SliderWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import ToolsSlider from './ToolsSlider';

export default function SliderWrapper() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  
  if (isLoginPage) return null;
  return <ToolsSlider />;
}