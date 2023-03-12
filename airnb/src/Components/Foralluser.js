import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reserve from "./Reserve";
import { ThreeDots } from "react-loader-spinner";
const Foralluser = () => {
  const { id } = useParams();
  const [hoteldata, setHotelData] = useState([]);
  const [Photo, setPhoto] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/accomodation/${id}`).then(({ data }) => {
      setHotelData(data);
    });
  }, [id]);

  if (hoteldata.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  if (Photo) {
    return (
      <div className="relative flex justify-center items-center flex-col w-full bg-black right-0 p-6 left-0 gap-4 top-[74px]">
        <div
          onClick={() => setPhoto(false)}
          className="fixed top-[90px] left-[40px] bg-white p-2 rounded-md  cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {hoteldata?.photos?.length > 0 &&
          hoteldata.photos.map((image) => {
            return (
              <img
                className="rounded-lg h-auto w-full object-cover"
                src={"http://localhost:4000/uploads/" + image}
              />
            );
          })}
        <div className="fixed top-[100px] text-white font-semibold ">
          Photos of {hoteldata.title}
        </div>
      </div>
    );
  }

  return (
    <div className="relative top-[72px] bottom-0 bg-slate-200  right-0 left-0 ">
      <div className="p-16  flex flex-col gap-2  max-md:p-8 max-lg:p-12  ">
        <h2 className="3xl">{hoteldata.title}</h2>
        <a
          className=" font-bold cursor-pointer underline"
          href={`https://www.google.com/maps/place/${hoteldata.address}`}
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {hoteldata.address}
          </div>
        </a>
        <div className="grid grid-cols-[2fr_1fr] relative gap-2 grid-rows-1 ">
          {hoteldata.photos?.[0] && (
            <div>
              <img
                onClick={() => setPhoto(true)}
                className=" w-full h-[400px]  object-cover cursor-pointer rounded-l-lg aspect-square"
                src={"http://localhost:4000/uploads/" + hoteldata.photos[0]}
              />
            </div>
          )}
          <div className="grid grid-cols-1 cursor-pointer gap-2 ">
            {hoteldata.photos?.[1] && (
              <div>
                <img
                  onClick={() => setPhoto(true)}
                  className="w-full object-cover cursor-pointer h-[196px] aspect-square rounded-r-lg"
                  src={"http://localhost:4000/uploads/" + hoteldata.photos[1]}
                />
              </div>
            )}
            {hoteldata.photos?.[2] && (
              <div>
                <img
                  onClick={() => setPhoto(true)}
                  className="w-full rounded-r-lg h-[196px] cursor-pointe object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + hoteldata.photos[2]}
                />
              </div>
            )}
          </div>
          {hoteldata.photos && (
            <div
              onClick={() => setPhoto(true)}
              className="absolute bottom-[12px] p-2 cursor-pointer rounded-md bg-black right-2"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-6 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col mt-4">
              <h2 className="font-bold">Desciption</h2>
              <p className="text-[14px] font-semibold">
                {hoteldata.description}
              </p>
            </div>
            <div className="flex flex-col font-semibold ">
              <span>checkin : {hoteldata.checkIn}</span>
              <span>checkout: {hoteldata.checkOut}</span>
              <span>Max number of peoples: {hoteldata.maxGuests}</span>
            </div>
          </div>
          <>
            <Reserve hoteldata={hoteldata} />
          </>
        </div>
        {hoteldata.extraInfo && (
          <div className="flex flex-col mt-2 bg-white w-full rounded-lg p-2">
            <h2 className="font-bold">Extra Information</h2>
            <p className="text-[14px] font-semibold">{hoteldata.extraInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foralluser;
