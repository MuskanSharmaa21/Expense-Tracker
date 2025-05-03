import { useUserAuth } from "../../hooks/useUserAuth";
import Navbar from "./Navbar"
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useUserAuth(); 

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
