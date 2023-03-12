import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  function Dateformat(date) {
    return dayjs(date).format("D MMM ,YYYY");
  }

 

  return (
    <div className="flex flex-col gap-4 px-12 max-md:px-8 mt-6 ">
      {bookings?.length > 0 &&
        bookings.map((booked) => {
          return (
            <div className="bg-slate-200 cursor-pointer  grid grid-cols-[1fr_3fr] max-sm:grid-cols-1 max-sm:h-auto place-content-center gap-6 rounded-lg p-4 h-[200px] ">
              <div>
                <img
                  className="w-full object-cover aspect-square rounded-md h-[180px]"
                  src={
                    "http://localhost:4000/uploads/" + booked.place.photos[0]
                  }
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{booked.place.title}</p>
                <a
                  href={`https://www.google.com/maps/place/${booked.place.address}`}
                >
                  <div className="flex gap-2 cursor-pointer">
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
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    {booked.place.address}
                  </div>
                </a>
                <div className="flex gap-2">
                  <h2 className="font-semibold">Booked Dates :</h2>
                  <span>{Dateformat(booked.checkIn)}</span>
                  <span>-</span>
                  <span>{Dateformat(booked.checkOut)}</span>
                </div>
                <div>
                  <span className="font-semibold">Total amount :</span> ${" "}
                  {booked.price}
                </div>
                <span className="font-semibold">{booked.place.extraInfo}</span>
                <div>
                  <span className="font-semibold">noofguest :</span>{" "}
                  {booked.noofpeople}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Bookings;
