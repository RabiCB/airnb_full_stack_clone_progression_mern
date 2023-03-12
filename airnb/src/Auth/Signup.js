import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = ({ setSignuppage, signuppage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("registerd sucessfully");
      navigate("/login")
    } catch (e) {
      alert("Register failed! try again");
    }
  }

  return (
    <div className="flex justify-center items-center fixed top-[72px] bottom-0 left-0 right-0 bg-gray-100">
      <div className=" max-sm:w-[400px] overflow-y-auto  opacity-100  text-black w-[480px] h-[500px]  rounded-lg z-40  bg-white">
        <div className="flex items-center py-4  justify-center">
          {" "}
          <span className="text-center font-bold">Log in or sign up</span>
        </div>
        <hr className="h-[2px] mt-2 w-full bg-slate-200"></hr>
        <div className="mt-4 font-semibold ml-4"> Welcome to Airbnb </div>
        <div className="text-[12px] ml-4 mt-2">have an account? <Link to="/login" className="font-semibold text-[14px]">login</Link></div>

        <form
          onSubmit={handleSubmit}
          className=" p-4 flex flex-col items-start justify-start "
        >
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-[0.4px] pl-4  w-full  border-black outline-none rounded-lg h-[42px]"
            placeholder="Your name "
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[0.4px] pl-4  w-full  border-black border-t-0 outline-none  rounded-lg h-[42px]"
            placeholder="Your email "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[0.4px] pl-4  w-full  border-black border-t-0 outline-none  rounded-lg h-[42px]"
            placeholder="Your password "
          />

          <p className="text-[12px] mt-[2px]">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button className="bg-[#e31c5f] text-white w-full h-[42px] rounded-lg mt-4">
            Continue
          </button>
          <div className="grid grid-cols-3 w-full place-content-center place-items-center grid-flow-row h-[10px] mt-4">
            <span className="h-[1px] mt-4  w-[100%] bg-slate-400"></span>
            <span className="text-[10px] text-slate-400">or</span>
            <span className="h-[1px] mt-4  w-[100%] bg-slate-400"></span>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2  mt-6">
            <div className="border-[1px] border-black flex items-center justify-center relative rounded-lg h-[42px] w-full">
              <img
                className="absolute left-2 w-[15px] object-contain"
                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              ></img>
              <span>continue with Facebook</span>
            </div>
            <div className="border-[1px] border-black flex items-center justify-center relative rounded-lg h-[42px] w-full">
              <img
                className="absolute left-2 w-[15px] object-contain"
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              ></img>
              <span>continue with Google</span>
            </div>

            <div className="border-[1px] border-black flex items-center justify-center relative rounded-lg h-[42px] w-full">
              <img
                className="absolute left-2 w-[15px] object-contain"
                src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              ></img>
              <span>continue with Apple </span>
            </div>
            <div className="border-[1px] border-black flex items-center justify-center relative rounded-lg h-[42px] w-full">
              <img
                className="absolute left-2 w-[15px] object-contain"
                src="https://cdn-icons-png.flaticon.com/512/9387/9387371.png"
              />
              <span>continue with Email </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
