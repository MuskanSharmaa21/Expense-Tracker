import React, { useState, useEffect } from "react";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const Last30DaysExpenses = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("Input data:", JSON.stringify(data, null, 2));
    const result = prepareExpenseBarChartData(data);
    console.log("Transformed chartData:", JSON.stringify(result, null, 2));
    setChartData(result);
  }, [data]);

  return (
    <div className="card col span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      {chartData.length ? (
        <CustomBarChart data={chartData} />
      ) : (
        <div>No expense data available</div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;