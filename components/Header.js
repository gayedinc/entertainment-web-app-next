'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookmarkSvg, TrendingSvg, MovieSvg, TvSeriesSvg } from './Svg';

export default function Header() {
  const pathname = usePathname();

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

      <div className="avatar-img">
        <img src="/img/avatar.svg" alt="Avatar" />
      </div>
    </header>
  );
}