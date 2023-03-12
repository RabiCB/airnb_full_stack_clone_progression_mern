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
  const navigate = useNavigate();
  async function handlelogout() {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
      setProfile(false);
    } catch (err) {
      alert("something happed");
    }
  }

  return (
    <>
      <div className="flex fixed top-0  left-0 right-0 z-30 bg-gray-50 items-center overflow-hidden justify-between h-[72px]  px-12 border-none">
        <Link to="/">
          <div className="flex gap-2 items-start justify-start">
            <FaAirbnb fontSize="32px" className="text-red-500 text-bold" />
            <span className="max-md:hidden font-bold text-xl  text-red-600">
              airbnb
            </span>
          </div>
        </Link>
        <div className="flex gap-2 items-center justify-center border-[1px] px-2 max-md:hidden py-[8px] shadow-gray-100  border-slate-300 rounded-full">
          <div className="text-[12px]">Anywhere</div>
          <span className="border-[1px] border-gray-400 h-[20px]"></span>
          <div className="text-[12px]">Any where</div>
          <span className="border-[1px] border-gray-400 h-[20px]"></span>
          <div className="text-[12px]">Add guests</div>

          <div className="bg-red-500 h-[24px] w-[24px] rounded-full flex items-center  justify-center text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center ">
          <div className="text-[14px] cursor-pointer">Airbnb your home</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>

          <div
            onClick={() => setProfile(!profile)}
            className="flex gap-[6px] items-center w-auto h-[30px] justify-center border-[1px] border-slate-200 shawdow-gray-200 rounded-full px-2 py-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            {user ? (
              <p className="text-[8px] pointer-events-none">{user.name}</p>
            ) : null}
          </div>
        </div>
        {profile ? (
          <div
            ref={ref}
            className="fixed shadow-gray-200 z-100 flex items-start justify-start gap-2 flex-col bg-gray-200 h-[192px] w-[220px] top-[74px] rounded-lg right-0 mr-12 z-4"
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
                <Link
                  to="/account"
                  className="text-[14px] font-semibold   w-[220px] hover:bg-white cursor-pointer pl-2 "
                  onClick={() => setProfile(false)}
                >
                  Profile
                </Link>
                <a
                  onClick={handlelogout}
                  className=" text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2  "
                >
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
    </>
  );
};

export default Navbar;
