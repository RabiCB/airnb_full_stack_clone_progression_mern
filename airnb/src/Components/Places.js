import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Places = () => {
  const [place, setPlace] = useState([]);
 /* useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlace(data);
    });
  }, []);*/
  return (
    <>
      <div className="flex items-center justify-center mt-6">
        <Link
          to={"/account/accomodation/new"}
          className="flex bg-red-400 gap-2 text-white px-6 py-2 rounded-full"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      
    </>
  );
};

export default Places;


/*<div className=" bg-gray-300 rounded-lg flex items-center justify-start p-4 h-[300px] m-6">
        {place.length > 0 &&
          place.map((places) => {
            return (
              <Link to={`/account/accomodation/${places._id}`}>
                <div className="flex items-star gap-4 ">
                  {places.photos.length > 0 && (
                    <div className="w-32 h-32 rounded-lg">
                      <img
                        className="w-full object-contain"
                        src={"http://localhost:4000/uploads/"+places.photos}
                        alt="picture"
                      />
                    </div>
                  )}
                  <p>{places.description}</p>
                </div>
              </Link>
            );
          })}
      </div>*/