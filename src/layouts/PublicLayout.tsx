import { Outlet } from "react-router-dom";
import PublicFooter from "../features/public-site/components/PublicFooter";
import PublicHeader from "../features/public-site/components/PublicHeader";

export default function PublicLayout() {
  return (
    <div>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </div>
  );
}
