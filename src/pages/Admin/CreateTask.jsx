import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";

import SelectDropdown from "../../Components/Inputs/SelectDropdown";
import SelectUsers from "../../Components/Inputs/SelectUsers";
import AddAttachmentsInput from "../../Components/Inputs/AddAttachementsInput";
import TodoListInput from "../../Components/Inputs/TodoListInput";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // CREATE TASK
  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task Created Successfully");
      clearData();
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE TASK (placeholder)
  const updateTask = async () => {
   setLoading(true);

   try {
    const todolist = taskData.todoChecklist?.map((item) => {
      const prevTodoChecklist = currentTask?.todoChecklist || [];
      const matchedTask = prevTodoChecklist.find((task) => task.text == item);

      return {
        text: item,
        completed: matchedTask ? matchedTask.completed : false,
      };
    });

    const response =await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TASK(taskId),
      {
        ...taskData,
        dueDate: new Date (taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      }
    );

    toast.success("Task Updated Successfully");
  } catch(error) {
    console.error("Error craeting task:", error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = () => {
    setError("");

    if (!taskData.title.trim()) return setError("Title is required");
    if (!taskData.description.trim()) return setError("Description is required");
    if (!taskData.dueDate) return setError("Due date is required");
    if (taskData.assignedTo.length === 0)
      return setError("Task not assigned to any member");
    if (taskData.todoChecklist.length === 0)
      return setError("Add atleast one todo task");

    taskId ? updateTask() : createTask();
  };

    //get Task info by Id
const getTaskDetailsByID = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
    );

    if (response.data) {
      const taskInfo = response.data;
      setCurrentTask(taskInfo);

      setTaskData((prevState) => ({
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        dueDate: taskInfo.dueDate
          ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
          : null,
        assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
        todoChecklist:
          taskInfo?.todoChecklist?.map((item) => item?.text) || [],
        attachments: taskInfo?.attachments || [],
      }));
    }
  } catch (error) {
    console.error("Error fetching users", error);
  }    
};

  // Delete Task
  const deleteTask = async ()=> {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate('/admin/tasks')
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }
    return()=>{};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 px-2 py-1 border border-rose-100 hover:bg-rose-50"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 /> Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                className="form-input"
                value={taskData.title}
                onChange={(e) =>
                  handleValueChange("title", e.target.value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) =>
                    handleValueChange("priority", value)
                  }
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={(e) =>
                    handleValueChange("dueDate", e.target.value)
                  }
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">
                {error}
              </p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>


    </DashboardLayout>
  );
};

export default CreateTask;


      
