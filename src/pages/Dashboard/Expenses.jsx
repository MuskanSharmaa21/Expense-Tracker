import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import useUserAuth from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm"
import DeleteAlert from "../../components/DeleteAlert";
import { API_PATH } from "../../utils/apiPath";

const Expenses=()=>{

    useUserAuth();
    const [openAddExpenseModal, setOpenAddExpenseModal] =useState(true);
    const[loading,setLoading] = useState(false);
    const[openDeleteAlert, setOpenDeleteAlert] = useState({
      show:false,
      data: null
    })
    const[expenseData, setExpenseData] = useState([]);
    const fetchExpenseDetails =async()=>{
      if(loading) return;
      setLoading(true);
      try{
        const response = await axiosInstance.get(
          `${API.PATH.EXPENSE.GET_ALL_EXPENSE}`
        );
        if(response.data){
          setexpenseData(response.data);
        }
      } catch(error){
        console.log("Something went wrong, Please try again later", error)
      } finally{
        setLoading(false)
      }
      
  
    }
    const handleAddExpense =async(expense)=>{
      const {category,amount,date,icon} = expense;
      if(!category.trim()){
        toast.error("Source is required");
        return;
      }
      if(!amount || isNaN(amount) || Number(amount) <=0) {
        toast.error("Amount should be a valid number")
        return;
      }
      if(!date){
        toast.error("Date is required")
      }
      try{
        await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE,{
          category,
          amount,
          date,
          icon
        });
        setOpenAddExpenseModal(false)
        toast.success("Expense added successfully")
        fetchExpenseDetails();
      } catch(error){
        console.error("Error adding Expense",
        error.response?.data?.message || error.message)
      }
     
    }
    useEffect(()=>{
      fetchExpenseDetails();
      return ()=>{}
    },[]);
    const deleteExpense =async(id)=>{
      try{
        await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))
        setOpenDeleteAlert({show:false, data:null});
        toast.success("Expense details deleted successfully")
        fetchExpenseDetails();
  
      } catch(error){
        console.error(
          "Error deleting Expense",
          error.response?.data?.message || error.message
        )
      }
    }
    const downloadExpenseDetails =async()=>{
  
    }
    useEffect(()=>{
      fetchExpenseDetails();
      return()=>{}
    },[]);
    const handleDownloadExpenseDetails=async()=>{
      try{
        const response = await axiosInstance.get (
          API_PATH.EXPENSE.DOWNLOAD_EXPENSE,
          {
            responseType:"blob"
          }
        );
        const url= window.URL.createObjectURL(new Blob(response.data))
        const link = document.createElement("a")
        link.href= url
        link.setAttribute("download", "expense_details.xlsx")
        document.body.appendChild(link);
        link.click()
        link.parentNode.removeChild(link)
        window.URL.revokeObjectURL(url);
      } catch(error){
      console.error("Error downloading Expense", error)
      toast.error("Failed to download expense details. Please try again")
    }

    }


 return ( <DashboardLayout activeMenu="Expense">
        <div className="my-5 nx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <ExpenseOverview
               transactions={expenseData}
               onExpenseExpense={()=> setOpenAddExpenseModal(true)} />
            </div>
            <ExpenseList 
             transactions={expenseData}
             onDelete={(id)=>{
              setOpenDeleteAlert({show:true, data:id});
             }}
             onDownload={handleDownloadExpenseDetails} />
          </div>
          <Modal
           isOpen={openAddExpenseModal}
           onClose={()=>setOpenAddExpenseModal(false)} 
           title="Add Expense"
           >
            <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>
            <Modal 
       isOpen={openAddExpenseModal}
       onClose={()=>{setOpenAddExpenseModal(false)}}
       title="Add Expense">
       <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>
      <Modal 
      isOpen={openDeleteAlert.show}
      onClose={()=>{setOpenDeleteAlert({show:false, data:null})}}
      title="Delete Expense"
      >
        <DeleteAlert
         content="Are you sure you want to delete this Expense details?"
         onDelete={()=>deleteExpense(openDeleteAlert.data)}
         />
      </Modal>
        </div>
    </DashboardLayout>
    )
}
export default Expenses;