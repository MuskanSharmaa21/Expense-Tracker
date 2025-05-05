import React, { useEffect, useState } from "react";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "./FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30daysExpenses";
import RecentIncomeWithChart from "../../components/Charts/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATH.DASHBOARD.GET_DASHBOARD);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error.response?.status, error.response?.data);
      setError("Failed to load dashboard data");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  console.log("dashboardData", dashboardData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard className=" text-black" />}
            label="Total Balance"
            color="bg-primary"
            value={addThousandsSeparator(dashboardData?.totalBalance) || "0"}
          />
          <InfoCard
            icon={<LuWalletMinimal className=" text-green-500"/>}
            label="Total Income"
            color="bg-orange-500"
            value={addThousandsSeparator(dashboardData?.totalIncome) || "0"}
          />
          <InfoCard
            icon={<LuHandCoins className=" text-red-500"/>}
            label="Total Expense"
            color="bg-red-500"
            value={addThousandsSeparator(dashboardData?.totalExpense) || "0"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions || []}
          onSeeMore={() => navigate("/expense")}
        />
        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />
        <ExpenseTransactions
          transactions={dashboardData?.last30daysExpense?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />
        <Last30DaysExpenses data={dashboardData?.last30daysExpense?.transactions || []} />
        <RecentIncomeWithChart
          data={dashboardData?.last60daysIncome?.transactions?.slice(0, 4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
        />
        <RecentIncome
          transaction={dashboardData?.last60daysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />
      </div>
    </DashboardLayout>
  );
};

export default Home;