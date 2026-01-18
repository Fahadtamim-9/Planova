import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import { LuUser, LuMail, LuLock, LuKey, LuArrowRight } from 'react-icons/lu';
import toast from 'react-hot-toast';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail]  = useState("");
  const [password, setPassword] = useState("") ;
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null) ;
  const [loading, setLoading] = useState(false);

  const {updateUser} = useContext(UserContext) 
    const navigate = useNavigate();

   // Handle SingUp Form Submit 
    const handleSignUp= async (e) => {
      e.preventDefault() ;
  
let profileImageUrl = '' 

 
    if (!fullName) {
      setError("Please enter full name.");
      return ;
    }

if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return ;
    }


    if (!password){
      setError("Please Enter the password");
      return ;
    }

    setError("");

    //SignUp API Call
    try {
      setLoading(true);

      // upload image if present 
      if (profilePic) {
      const imgUploadRes = await uploadImage (profilePic)
      profileImageUrl = imgUploadRes.imageUrl || "";
    } 

  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
    name: fullName,
    email,
    password,
      profileImageUrl,
    adminInviteToken
  });

  const { token, role } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);

    toast.success("Account created successfully");

    //Redirect based on role
if (role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/user/dashboard");
}

   } 
  } catch (error) {
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("Something went wrong. Please try again.");
  }
} finally {
  setLoading(false);
}
    };


  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us and start managing your tasks efficiently</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Min 8 characters"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Admin Invite Token (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Invite Token <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={adminInviteToken}
                onChange={({ target }) => setAdminInviteToken(target.value)}
                placeholder="6 digit code"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter invite code to register as admin
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <>
                Create Account
                <LuArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-blue-700 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;