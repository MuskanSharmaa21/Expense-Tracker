import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
// utils/helper.js
export const prepareExpenseBarChartData = (transactions = []) => {
  console.log("prepareExpenseBarChartData input:", transactions);
  if (!Array.isArray(transactions)) {
    console.warn("Invalid transactions input:", transactions);
    return [];
  }
  const grouped = transactions.reduce((acc, item) => {
    const category = item.source || item.category || "Unknown";
    const amount = Number(item.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
  const result = Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount,
  }));
  console.log("prepareExpenseBarChartData output:", JSON.stringify(result, null, 2));
  return result;
};

export const prepareIncomeBarChartData =(data=[])=>{
  const sortedData=[...data].sort ((a , b)=>new Date(a.date)- new Date(b.date));
  const chartData = sortedData.map((item)=>({
    month : moment(item?.date).format('Do MM'),
    amount : item?.amount,
    source : item?.source
  }));
  return chartData;
}

  export const prepareIncomeLineChartData =(data=[])=>{
    const sortedData=[...data].sort ((a , b)=>new Date(a.date)- new Date(b.date));
    const chartData = sortedData.map((item)=({
      month : moment(item ?.date).format('Do MM'),
      amount : item?.amount,
      category : item?.category
    }));
    return chartData;
  }
  
  

