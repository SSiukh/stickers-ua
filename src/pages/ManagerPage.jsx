import { Outlet } from "react-router-dom";
import BackLayout from "../components/BackLayout/BackLayout";
import ManagerSidebar from "../components/ManagerSidebar/ManagerSidebar";

const ManagerPage = () => {
  return (
    <div>
      <BackLayout>
        <ManagerSidebar />
        <Outlet />
      </BackLayout>
    </div>
  );
};

export default ManagerPage;
