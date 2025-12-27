import React, { useState } from 'react'
import AuthLayout from '../../Components/layouts/AuthLayout'

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, SetFullName] = useState("");
  const [email, setEmail]  = useState("");
  const [password, setPassword] = useState("") ;
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null) ;

   // Handle SingUp Form Submit 
    const HandleSignUp= async (e) => {
      e.preventDefault() ;
    };
 
    if (!fullName) {
      setError("Please enter full name.");
      return ;
    }

if (!ValidEmail(email)) {
      setError("Please enter a valid email address.");
      return ;
    }


    if (!password){
      setError("Please Enter the password");
      return ;
    }

    setError("");

    //SignUp API Call
  };


  return (
    < AuthLayout>
    <div className="lg: w-[100] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
    <h3 className="text-xl front-semibold text-black "> Create an Account</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
          </div> 
          </form>

      </div>


    </AuthLayout>
  )


export default Signup