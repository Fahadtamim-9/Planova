import React from "react";
import UI_IMG from "../../assets/images/auth-img,png" ;

const AuthLayout = ({children}) => {
    return <div className="flex" >
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 p-12" >
         <h2 className="text-lg font-medium text-black">Planova</h2>
         {children}
        </div>

        <div className= "hidden md:flex w-[400vw] h-screen items-centre justify- centre bg-blue-50 bg-[url('/bg-img.png)] bg-cover bg-no-repeat bg-center overflow-hidden p8">
        
            <img src={UI_IMG} className="w-64 lg:w-[90]" />
            </div>
            </div>
};        
    


export default AuthLayout