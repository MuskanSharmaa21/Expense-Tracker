import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import useUserAuth from "../../hooks/useUserAuth";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import DeleteAlert from "../../components/DeleteAlert";
import { API_PATH } from "../../utils/apiPath";
import toast from "react-hot-toast";
const Income=()=>{
  useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] =useState(true);
  const[loading,setLoading] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data: null
  })
  const[incomeData, setIncomeData] = useState([]);

  const fetchIncomeDetails =async()=>{
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosInstance.get(API_PATH.EXPENSE.GET_INCOME);
      console.log("Income response", response);
      setIncomeData(response.data);
    } catch(error){
      console.log("Something went wrong, Please try again later", error)
    } finally{
      setLoading(false)
    }


  }
  const handleAddIncome =async(income)=>{
    const {source,amount,date,icon} = income;
    if(!source.trim()){
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
      await axiosInstance.post(API_PATH.EXPENSE.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      });
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails();
    } catch(error){
      console.error("Error adding income",
      error.response?.data?.message || error.message)
    }
   
  }
  const deleteIncome =async(id)=>{
    try{
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_INCOME(id))
      setOpenDeleteAlert({show:false, data:null});
      toast.success("Income details deleted successfully")
      fetchIncomeDetails();

    } catch(error){
      console.error(
        "Error deleting Income",
        error.response?.data?.message || error.message
      )
    }
  }
  const handleDownloadIncomeDetails =async()=>{
    try{
      const response = await axiosInstance.get (
        API_PATH.INCOME.DOWNLOAD_INCOME,
        {
          responseType:"blob"
        }
      );
      const url= window.URL.createObjectURL(new Blob(response.data))
      const link = document.createElement("a")
      link.href= url
      link.setAttribute("download", "Income_details.xlsx")
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url);
    } catch(error){
    console.error("Error downloading Income", error)
    toast.error("Failed to download Income details. Please try again")
  }
  }
  useEffect(()=>{
    fetchIncomeDetails();
    return()=>{}
  },[]);
  console.log("Income data", incomeData)
  return(
    <DashboardLayout activeMenu="Income">
      <div className="my-5 nx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview 
            transactions={incomeData}
            onAddIncome={()=>{setOpenAddIncomeModal(true)}} />
          </div>
          <IncomeList
           transactions={incomeData}
           onDelete={(id)=>{
            setOpenDeleteAlert({show:id, data:id});
           }}
           onDownload={handleDownloadIncomeDetails}
           />
        </div>
        <Modal 
       isOpen={openAddIncomeModal}
       onClose={()=>{setOpenAddIncomeModal(false)}}
       title="Add Income">
       <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
      <Modal 
      isOpen={openDeleteAlert.show}
      onClose={()=>{setOpenDeleteAlert({show:false, data:null})}}
      title="Delete Income"
      >
        <DeleteAlert
         content="Are you sure you want to delete this income details?"
         onDelete={()=>deleteIncome(openDeleteAlert.data)}
         className=""
         />
      </Modal>
      </div>
      
    </DashboardLayout>
  )

}
export default Income;