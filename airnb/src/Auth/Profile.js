import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "./AuthContext";
import axios from "axios";
import Myplaces from "../Components/Myplaces";
import Bookings from "../Components/Bookings";


const Profile = () => {
  const { user, setUser,place } = User();

  let { subpage } = useParams();
  const navigate = useNavigate();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkclasses(type = null) {
    let classes = "inline-flex py-2 px-4 rounded-full";
    if (type === subpage) {
      classes += " bg-red-400 text-white rounded-full ";
    } else {
      classes += " bg-gray-300 ";
    }
    return classes;
  }
  async function handlelogout() {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      alert("something happed");
    }
  }
  return (
    <div className="absolute top-[72px] bottom-0   left-0 right-0">
      <nav className="flex w-full mt-6  justify-center gap-4">
        <Link className={linkclasses("profile")} to="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My profile{" "}
        </Link>
        <Link className={linkclasses("bookings")} to="/account/bookings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          My bookings
        </Link>
        <Link
          className={linkclasses("accomodation")}
          to="/account/accomodation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My accomodation
        </Link>
      </nav>

      {subpage === "profile" && (
       <div className="text-center font-semibold mt-[30px] flex items-center justify-center   gap-6">
          {user &&(<div className="flex items-center  justify-center flex-col  gap-6">
            <span className="text-[12px]">
              logged in as {user?.name} ({user?.email})
            </span>
            
            <button
              onClick={handlelogout}
              className="bg-red-400 text-white text-center rounded-full h-[32px] w-[200px]"
            >
              Logout
            </button>
          </div>)}
        </div>
      )}

      {subpage === "accomodation" && (
        <>
          <Myplaces />
        </>
      )}

      {
        subpage==="bookings"&&(
          <>
          <Bookings/>
          </>
        )
      }
    </div>
  );
};

export default Profile;
