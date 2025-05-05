import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../../components/Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  console.log(chartData);

  return (
    <div className="card p-6 shadow-lg rounded-2xl bg-white">
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h5 className="text-xl font-semibold text-gray-800">Expense Overview</h5>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Track your spending trends over time and gain insights into where your money goes
            </p>
          </div>
          <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
        </div>

        <div className="mt-4">
          <CustomLineChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;
