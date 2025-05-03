import { LuLayoutDashboard ,LuHandCoins, LuWalletMinimal,LuLogOut } from "react-icons/lu";
export const SIDE_MENU_DATA = [
  {
    id : "01",
    icon: LuLayoutDashboard,
    label: "Dashboard",
    path : "/dashboard",
  },{
    
    id : "02",
    icon: LuWalletMinimal,
    label: "Income",
    path : "/income",
  },{
    id : "03",
    icon: LuHandCoins,
    label: "Expense",
    path : "/expense",
  },{
    id : "06",
    icon: LuLogOut,
    label: "LogOut",
    path : "/logou",
  }
]