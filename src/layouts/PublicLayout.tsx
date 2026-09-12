import { Outlet } from "react-router-dom";
import PublicFooter from "../features/public-site/components/PublicFooter";
import PublicHeader from "../features/public-site/components/PublicHeader";
import PromoBanner from "../features/public-site/pages/PromoBanner";
// import HeroBanner from "../features/public-site/pages/HeroBanner";

export default function PublicLayout() {
  return (
    <div>
      <PublicHeader />
      <PromoBanner/>
      {/* <HeroBanner/> */}

      <main className="flex-1">
        <Outlet />
      </main>
    
      <PublicFooter />
    </div>
  );
}
