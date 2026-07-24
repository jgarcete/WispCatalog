'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8,
  size: 2 + Math.random() * 3,
}));

export default function WelcomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    if (sessionStorage.getItem('wisp_visited')) {
      router.replace('/catalog');
    }
  }, [router]);

  const handleEnter = () => {
    sessionStorage.setItem('wisp_visited', 'true');
  };

  if (!mounted || (typeof window !== 'undefined' && sessionStorage.getItem('wisp_visited'))) {
    return null; 
  }

  return (
    <section className="welcome">
      {}
      <div className="welcome__bg">
        <motion.div
          className="welcome__gradient-orb welcome__gradient-orb--gold"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="welcome__gradient-orb welcome__gradient-orb--green"
          animate={{
            scale: [1, 1.15, 1],
            y: [0, 20, 0],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="welcome__gradient-orb welcome__gradient-orb--accent"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 15, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {}
      <div className="welcome__particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="welcome__particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {}
      <div className="welcome__content">
        {}
        <motion.h1
          className="welcome__logo"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
        >
          Wisp
        </motion.h1>

        {}
        <motion.div
          className="welcome__divider"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {}
        <motion.p
          className="welcome__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Catálogo de productos
        </motion.p>

        {}
        <motion.div
          className="welcome__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <Link href="/catalog" onClick={handleEnter} className="btn-primary" style={{ gap: '12px', fontSize: '1rem', padding: '16px 40px' }}>
            Explorar Catálogo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
