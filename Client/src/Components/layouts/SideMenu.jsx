import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../Modal";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutConfirm(true);
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    const toastId = toast.loading("Signing you out...");
    setShowLogoutConfirm(false);
    setTimeout(() => {
      localStorage.clear();
      clearUser();
      toast.success("Logged out", { id: toastId });
      navigate("/login");
    }, 200);
  };

 useEffect(() => {
  if (user) {
    setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
  }
  return () => {};
}, [user]);
return <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
  <div className="flex flex-col items-center justify-center mb-7 pt-5">
    <div className="relative">
      {user?.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt="Profile Image"
          className="w-20 h-20 bg-slate-400 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      )}
    </div> 
  
  {user?.role === "admin" && (
    <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
      Admin
    </div>
  )} 

<h5 className="text-gray-950 font-medium leading-6 mt-3">
  {user?.name || ""}
</h5>

<p className="text-[12px] text-gray-500">{user?.email || ""}</p>
</div>

{sideMenuData.map((item, index) => (
  <button
    key={`menu_${index}`}
    className={`w-full flex items-center gap-4 text-[15px] ${
      activeMenu == item.label
        ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
        : ""
    } py-3 px-6 mb-3 cursor-pointer`}
    onClick={() => handleClick(item.path)}
  >
    <item.icon className="text-xl" />
    {item.label}
  </button>
))};
  <Modal
    isOpen={showLogoutConfirm}
    onClose={() => setShowLogoutConfirm(false)}
    title="Confirm logout"
  >
    <p className="text-sm text-gray-600">Are you sure you want to log out?</p>
    <div className="flex justify-end gap-2 pt-4">
      <button
        className="px-3 py-2 text-sm rounded border border-gray-200 hover:bg-gray-50"
        onClick={() => setShowLogoutConfirm(false)}
      >
        Cancel
      </button>
      <button
        className="px-3 py-2 text-sm rounded bg-primary text-white hover:bg-blue-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </Modal>
</div>
};

export default SideMenu; 