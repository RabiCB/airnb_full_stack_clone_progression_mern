import React, { useState, useEffect } from "react";
import { FaAirbnb } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { User } from "../Auth/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const { user, setUser } = User();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (profile && ref.current && !ref.current.contains(e.target)) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [profile]);
  const navigate=useNavigate()
  async function handlelogout() {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/")
    } catch (err) {
      alert("something happed");
    }
  }
  

  return (
    <div className="relative z-100 ">
      <div className="flex items-center justify-between h-[72px]  px-12 border-2">
        <Link to="/"><div className="flex gap-2 items-start justify-start">
          <FaAirbnb fontSize="32px" className="text-red-500 text-bold" />
          <span className="max-md:hidden font-bold text-xl  text-red-600">
            airbnb
          </span>
        </div>
        </Link>
        <div className="flex gap-2 items-center justify-center border-2 px-2 py-[8px] shadow-gray-100  border-slate-300 rounded-full">
          <div className="text-[12px]">Anywhere</div>
          <span className="border-[1px] border-gray-400 h-[20px]"></span>
          <div className="text-[12px]">Any where</div>
          <span className="border-[1px] border-gray-400 h-[20px]"></span>
          <div className="text-[12px]">Add guests</div>

          <div className="bg-red-500 h-[24px] w-[24px] rounded-full flex items-center  justify-center text-white ">
            <AiOutlineSearch className="cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center ">
          <div className="text-[14px] cursor-pointer">Airbnb your home</div>
          <AiOutlineGlobal className="cursor-pointer" />
          <div
            onClick={() => setProfile(!profile)}
            className="flex gap-[6px] items-center w-auto h-[30px] justify-center border-[2px] border-slate-200 rounded-full px-2 py-2 "
          >
            <BiMenu fontSize="24px" className="cursor-pointer" />
            <RxAvatar fontSize="24px" className="cursor-pointer" />
            {user ? (
              <p className="text-[8px] pointer-events-none">{user.name}</p>
            ) : null}
          </div>
        </div>
        {profile ? (
          <div
            ref={ref}
            className="absolute shadow-gray-200 z-50 flex items-start justify-start gap-2 flex-col bg-slate-200 h-[192px] w-[220px] top-[74px] rounded-lg right-0 mr-12 z-4"
          >
            {!user ? (
              <div className="flex flex-col items-start justify-start gap-2 py-2">
                <Link
                  className="text-[14px] font-semibold cursor-pointer  w-[220px] hover:bg-white  pl-2 "
                  to="/signup"
                  onClick={() => setProfile(false)}
                >
                  Sign up
                </Link>
                <Link
                  className=" text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2  "
                  to="/login"
                  onClick={() => setProfile(false)}
                >
                  Log in
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start gap-2 py-2">
                <Link to="/profile" className="text-[14px] font-semibold   w-[220px] hover:bg-white cursor-pointer pl-2 ">
                  Profile
                
                </Link>
                <a onClick={handlelogout}className=" text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2  ">
                  Log out
                </a>
              </div>
            )}
            <hr className="w-full h-[2px] bg-gray-400 opacity-50" />
            <div className="flex flex-col items-start justify-start gap-2  py-2">
              <a className="text-[14px] w-[220px]  hover:bg-white cursor-pointer pl-2">
                Airnb your home
              </a>
              <a className="text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2 ">
                Host an experience
              </a>
              <a className="text-[14px]   w-[220px] hover:bg-white cursor-pointer pl-2 ">
                help
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
