import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import ThemeApplier from '@/components/ThemeApplier';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'Wisp — Catálogo de productos',
  description:
    'Explora nuestro catálogo de productos. Busca, explora detalles y guarda tus favoritos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <ThemeApplier />
          <LayoutShell>{children}</LayoutShell>
        </StoreProvider>
      </body>
    </html>
  );
}
