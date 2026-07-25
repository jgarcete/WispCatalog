'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ToastProvider } from '@/components/Toast';
import { useEffect, useState } from 'react';

function GlobalParticles() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    
    setTimeout(() => {
      setParticles(
        Array.from({ length: 30 }, (_, i) => {
          const duration = 15 + Math.random() * 25; 
          return {
            id: i,
            left: `${Math.random() * 100}%`,
            delay: -(Math.random() * duration), 
            duration,
            size: 1 + Math.random() * 2,
          };
        })
      );
    }, 0);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden opacity-70">
      {particles.map((p) => (
        <div
          key={p.id}
          className="welcome__particle"
          style={{ left: p.left, width: `${p.size}px`, height: `${p.size}px`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
    </div>
  );
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWelcomePage = pathname === '/';

  return (
    <ToastProvider>
      <GlobalParticles />
      {}
      {!isWelcomePage && <Navbar />}
      <main className="relative z-10">{children}</main>
    </ToastProvider>
  );
}
