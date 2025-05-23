import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard"
const ExpenseList=({transactions, onDelete,onDownload})=>{
  console.log("ExpenseList", transactions)
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn">
          <LuDownload className="text-base"/>
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense)=>{
          return (<TransactionInfoCard
          key={expense.id}
          title={expense.category}
          icon={expense.icon}
          date={moment(expense.date).format("DD MM YYYY")}
          amount={expense.amount}
          type="expense"
          onDelete= {() => onDelete(expense._id)}
          />)
        })}
      </div>
    </div>
  )
}

export default ExpenseList;