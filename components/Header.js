'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BookmarkSvg, TrendingSvg, MovieSvg, TvSeriesSvg } from './Svg';
import LogoutModal from './LogoutModal';
import { createClient } from '@/supabase/supabaseClient';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <header>
      <figure>
        <Link href="/homepage">
          <img src="/img/header-icon.svg" alt="Header Icon" />
        </Link>
      </figure>

      <nav>
        <ul>
          <li className={pathname === '/homepage' ? 'active' : ''}>
            <Link href="/homepage">
              <TrendingSvg />
            </Link>
          </li>
          <li className={pathname === '/movies' ? 'active' : ''}>
            <Link href="/movies">
              <MovieSvg />
            </Link>
          </li>
          <li className={pathname === '/series' ? 'active' : ''}>
            <Link href="/series">
              <TvSeriesSvg />
            </Link>
          </li>
          <li className={pathname === '/bookmarks' ? 'active' : ''}>
            <Link href="/bookmarks">
              <BookmarkSvg />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <div className="avatar-img">
          <img src="/img/avatar.svg" alt="Avatar" />
        </div>
        <button onClick={() => setIsLogoutModalOpen(true)} className="logout-header-button">
          Çıkış Yap
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}