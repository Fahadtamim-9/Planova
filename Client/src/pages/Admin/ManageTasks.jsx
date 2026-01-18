import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../Components/layouts/DashboardLayout" ;
import {useNavigate } from "react-router-dom" ;
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../Components/TaskStatusTabs";
import TaskCard from "../../Components/Cards/TaskCard";
import toast from "react-hot-toast";
import { LuFileSpreadsheet, LuPlus } from "react-icons/lu";

 const ManageTasks = () => {

  const [allTasks, setAllTasks] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {

    try{
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params:{
          status: filterStatus ==="All" ? "" : filterStatus,
        }
      });

      setAllTasks(response.data?.tasks && response.data.tasks.length > 0 ? response.data.tasks : []);

      //Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {} ;

      const statusArray = [
        {label: "All", count: statusSummary.all || 0 },
        {label:"Pending", count: statusSummary.pendingTasks || 0 },
        {label:"In Progress", count: statusSummary.inProgressTasks || 0 } ,
        {label:"Completed", count: statusSummary.completedTasks || 0 } ,
      ];

      setTabs(statusArray) ;
    } catch (error){
      console.error("Error fetching users :", error);
    }
  };

  const handleClick = (taskData) => {
    navigate('/admin/create-task', { state: { taskId: taskData._id } });
  };

  // download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading task report:", error);
      toast.error("Failed to download task report. Please try again.");
    }
  };
   
  useEffect(() =>  {
    getAllTasks(filterStatus);
    return() => {};
  },[filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-medium">Manage Tasks</h2>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              onClick={() => navigate('/admin/create-task')}
            >
              <LuPlus className="text-lg" />
              Create Task
            </button>

            <button 
              className="flex items-center gap-2 download-btn" 
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              <span className="hidden lg:inline">Download Report</span>
            </button>
          </div>
        </div>

        {tabs?.[0]?.count > 0 && (
          <div className="mt-4">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}

        {allTasks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo || []}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuPlus className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">
              {filterStatus === "All" 
                ? "Get started by creating your first task." 
                : `No tasks with status "${filterStatus}"`}
            </p>
            <button 
              className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => navigate('/admin/create-task')}
            >
              <LuPlus className="text-lg" />
              Create New Task
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default ManageTasks ;