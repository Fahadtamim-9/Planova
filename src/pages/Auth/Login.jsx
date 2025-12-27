import React, { useState } from "react" ;
import AuthLayout from "../../Components/layouts/AuthLayout" ;
import { Link, useNavigate} from "react-router-dom" ;
import Input from "../../Components/Inputs/Inputs";

const Login = () => {
  const [email, setEmail] = useState("") ;
   const [password, setPassword] = useState("") ;
    const [error, setError] = useState("") ;

    const navigate = useNavigate();
 
    // Handle Login Form Submit 
    const  HandleLogin = async (e) => {
      e.preventDefault() ;
    };
 
    if (!ValidEmail(email)) {
      setError("Please enter a valid email address.");
      return ;
    }

    if (!password){
      setError("Please Enter the password");
      return ;
    }

    setError("");

    //Login API Call
  };

    return (
 <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col jutify-centre">
      <h3 className="text-xl front-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to login 
      </p>
      
      <form onSubmit = {HandleLogin} >
        <Input
        value= {email}
        onChange= {({target}) => setEmail(target.value) }
        label= "Email Adress"
        placeholder= "john@xample.com"
        type="text"
        />
     
      <Input
        value= {password}
        onChange= {({target}) => setPassword(target.value) }
        label= "Password"
        placeholder= "Min 8 Characters"
        type="password"
       />
,
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }

        <button type="submit" className="btn-primary">
          LOGIN
          </button>

          <p className="text-[13px]  text-slate-800 mt-3">
            Don't have an account? {" "}
            <Link className="font-medium text-primary underline" to="/signup">
            SignUp
            </Link>
            </p>


      </form>
      </div>
    </AuthLayout>
    );

export default Login 