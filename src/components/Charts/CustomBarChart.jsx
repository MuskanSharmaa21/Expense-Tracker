import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomToolTip = ({ active, payload }) => {

    if (active && payload && payload.length) {

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-100 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Test with hardcoded data directly in CustomBarChart
  const testData = [
    { category: "Food", amount: 500 },
    { category: "Travel", amount: 300 },
  ];

  return (
    <div className="bg-white mt-6" style={{ minHeight: "300px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.length ? data : testData}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="source" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]} activeBar={{ fill: "green" }}>
            {data.length
              ? data.map((entry, index) => {

                  return <Cell key={`cell-${index}`} fill={getBarColor(index)} />;
                })
              : testData.map((entry, index) => {

                  return <Cell key={`cell-${index}`} fill={getBarColor(index)} />;
                })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;