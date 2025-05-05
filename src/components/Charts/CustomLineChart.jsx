import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const ExpenseBarChart = ({ data }) => {
  console.log("bar chart data", data);
  
  // Ensure data has category property for X-axis
  const chartData = data.map(item => ({
    ...item,
    name: item.category || item.name || "Unknown"
  }));
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200">
          <p className="font-semibold text-gray-700">
            {payload[0].payload.name}
          </p>
          <p className="text-sm font-medium text-purple-700">
            Amount: ${payload[0].payload.amount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Expense Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="#eee"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="#eee"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="#875cf5" 
            radius={[4, 4, 0, 0]} 
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;