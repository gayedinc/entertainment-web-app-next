'use client';
import Link from 'next/link';
import Image from 'next/image';
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
      console.error('Error occurred during logout:', error);
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <header>
      <figure>
        <Link href="/homepage">
          <Image 
            src="/img/header-icon.svg" 
            alt="Header Icon"
            width={32}
            height={32}
          />
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
          <Image 
            src="/img/avatar.svg" 
            alt="Avatar"
            width={40}
            height={40}
          />
        </div>
        <button onClick={() => setIsLogoutModalOpen(true)} className="logout-header-button">
          Log Out
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