import './globals.css';
import { Toaster } from 'react-hot-toast';
import { DataContextProvider } from '../context/DataContext';
import { BookmarkedProvider } from '../context/BookmarkContext';
import { UserProvider } from '../context/UserContext';

export const metadata = {
  title: 'Entertainment Web App',
  description: 'Watch and manage movies and series',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Toaster position="top-center" />
          <DataContextProvider>
            <BookmarkedProvider>
              <main className="container">{children}</main>
            </BookmarkedProvider>
          </DataContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}