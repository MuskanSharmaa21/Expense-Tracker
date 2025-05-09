import EmojiPicker from "emoji-picker-react";
import Input from "../../components/Input/Input"
import React from "react";
import { useState } from "react";
import EmojiPickerPopup1 from "../EmojiPickerPopup1";
const AddIncomeForm =({onAddIncome})=>{
  const[income,setIncome] = useState({
    source:"",
    amount:"",
    date:"",
    icon:""
  })
  const handleChange =(key,value)=>setIncome({...income,[key]:value});
  return(
    <div>
      <EmojiPickerPopup1
      icon={income.icon}
      onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)} />
      <Input
       value={income.source}
       onChange={({target})=>handleChange("source",target.value)}
       label="Income Source"
       placeholder="Freelance,Salary etc"
       type="text" />
       <Input
        value={income.amount}
        onChange={({target})=>handleChange("amount",target.value)}
        label="amount"
        placeholder=""
        type="number" />
        <Input 
        value={income.date}
        onChange={({target})=>handleChange("date",target.value)}
        label="Date"
        placeholder=""
        type="date" />
        <div className="flex justify-end mt-6">
          <button 
           type="button"
           className="add-btn add-btn-fill "
           onClick={()=>onAddIncome(income)}><span className="text-black">Add Income</span></button>
        </div>

    </div>
  )
}
export default AddIncomeForm;