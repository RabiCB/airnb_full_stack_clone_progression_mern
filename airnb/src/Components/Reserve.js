import React from "react";
import { useState } from "react";
import {differenceInCalendarDays} from "date-fns"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Auth/AuthContext";
const Reserve = ({hoteldata}) => {
  const {user}=User()
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noofpeople, setNoofpeople] = useState(1);
  const [name,setName]=useState(user?.name)
  const [phone,setPhone]=useState("")

  const navigate=useNavigate()

  let numberofnights=0;
  if (checkIn && checkOut) {
    numberofnights = differenceInCalendarDays(new Date(checkOut) ,new Date(checkIn));
  }

 
  function handleBooking(e){
    e.preventDefault();
    axios.post("/booking",{
      place:hoteldata._id,
      checkIn,
      checkOut,
      noofpeople,
      name,
      phone,
      price:numberofnights*hoteldata.price,
    })
    navigate("/account/bookings")
    
  }
  return (
    <>
      <div className="bg-white shadow p-4 border-2 rounded-lg border-none flex flex-col gap-4 font-semibold ">
        <span className="text-center">
          {" "}
          price : ${hoteldata.price} / per night
        </span>
        <div className="flex flex-col ">
          <div className="flex  ">
            <div className="border-[2px] flex flex-col w-full text-[12px] cursor-pointer  rounded-tl-lg border-b-0 border-r-0 bg-white  p-2 ">
              <label>checkin:</label>
              <input
                onChange={(e) => setCheckIn(e.target.value)}
                type="date"
                value={checkIn}
                className="outline-none"
              />
            </div>
            <div className="border-[2px] w-full  flex flex-col cursor-pointer text-[12px]  bg-white rounded-tr-lg border-b-0  p-2">
              <label>checkout:</label>
              <input
                onChange={(e) => setCheckOut(e.target.value)}
                value={checkOut}
                type="date"
                className="outline-none"
              />
            </div>
          </div>
          <div className="border-t-none border-[2px] flex  text-[12px] bg-white rounded-b-lg w-full p-2">
            number of people:{" "}
            <input
              value={noofpeople}
              onChange={(e) => setNoofpeople(e.target.value)}
              className=" rounded-lg pl-2 outline-none border w-full"
              type="number"
            />
          </div>
        </div>
        {numberofnights>0 &&(
          <div className="flex gap-2 flex-col items-start">
          <label className="text-[12px] flex-1">your name:</label>
           <input
           value={user?.name}
           onChange={(e) => setName(e.target.value)}
           className=" rounded-md py-[4px] px-2 font-normal outline-none border w-full"
           type="text"
           placeholder="Rabi Bhandari"
         />
         </div>
        )}
        {numberofnights>0 &&(
          <div className="flex gap-2 flex-col items-start">
          <label className="text-[12px] flex-1">your phone:</label>
           <input
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
           className=" rounded-md py-[4px] px-2 font-normal outline-none border w-full"
           type="text"
           placeholder="+9779824567289"
         />
         </div>

        )}
         
        <button onClick={handleBooking} className="bg-red-400 p-2  text-white rounded-lg">
          Reserve this place
         
        </button>
        {numberofnights>0 &&(<div className="text-[12px]">
        Total cost for selected date : {numberofnights>0&&(<span>$ {numberofnights*hoteldata.price}</span>)}
        </div>)}
      </div>
    </>
  );
};

export default Reserve;
