import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const withSearchBarAndHero = pathname === "/" || pathname === "/search";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {withSearchBarAndHero && (
        <>
          <Hero />
          <div className="max-w-[1000px] mx-auto px-2 lg:px-0">
            <SearchBar />
          </div>
        </>
      )}
      <div className="container mx-auto py-10 px-2 xl:px-0 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
