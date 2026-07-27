'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { toggleTheme } from '@/store/themeSlice';
import { resetProducts, setSearchQuery, setCategory, setMaxPrice } from '@/store/productsSlice';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const favCount = useSelector((state: RootState) => state.favorites.ids.length);
  const theme = useSelector((state: RootState) => state.theme.mode);

  const links = [
    { href: '/catalog', label: 'Catálogo' },
    { href: '/favorites', label: 'Favoritos' },
  ];

  return (
    <nav className="navbar-custom" role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        <Link 
          href="/catalog" 
          className="navbar__logo"
          onClick={(e) => {
            setIsOpen(false);
            // Resetear todos los filtros
            dispatch(setSearchQuery(''));
            dispatch(setCategory(''));
            dispatch(setMaxPrice(''));
            dispatch(resetProducts());
            if (pathname === '/catalog') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          Wisp
        </Link>

        <button className="navbar__toggle" onClick={() => setIsOpen((prev) => !prev)} aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isOpen} type="button">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`navbar__link ${pathname === href ? 'navbar__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {label}
              {}
              {label === 'Favoritos' && favCount > 0 && (
                <motion.span className="navbar__badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }} key={favCount}>
                  {favCount}
                </motion.span>
              )}
            </Link>
          ))}
          <button
            onClick={() => {
              dispatch(toggleTheme());
              setIsOpen(false);
            }}
            className="navbar__link"
            aria-label="Cambiar tema"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
