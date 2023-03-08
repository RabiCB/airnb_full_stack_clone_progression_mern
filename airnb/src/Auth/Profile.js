import React from "react";

import { User } from "./AuthContext";

const Profile = () => {
    const {user}=User()
    
    
  return (
    <div className="flex justify-center items-center fixed top-[72px] bottom-0 left-0 right-0 bg-gray-100">
      <div
        
        className="border-none overflow-y-auto  opacity-100  text-black w-[480px] h-[500px]  rounded-lg z-40   bg-white"
      >
        
        <div className="flex items-center py-4  justify-center">
          {" "}
          <span className="text-center font-bold">Your Profile</span>
        </div>
        <hr className="h-[2px] mt-2 w-full bg-slate-200"></hr>
        <div className="mt-4 font-semibold text-[14px] ml-4">Hello {user && (user.name)} </div>
        <div className="mt-4  text-[12px] ml-4">Email : {user&&(user.email)} </div>
        

       
      </div>
    </div>
  );
};

export default Profile;
