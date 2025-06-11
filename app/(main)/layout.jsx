import Header from "@/components/Header";
import { DataContextProvider } from "@/context/DataContext";
import { BookmarkedProvider } from "@/context/BookmarkContext";

export default function MainLayout({ children }) {
  return (
    <DataContextProvider>
      <BookmarkedProvider>
        <Header />
        {children}
      </BookmarkedProvider>
    </DataContextProvider>
  );
}