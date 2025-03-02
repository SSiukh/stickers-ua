import Header from "./Header/Header";
import { Suspense } from "react";
import Loader from "./Loader/Loader";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
