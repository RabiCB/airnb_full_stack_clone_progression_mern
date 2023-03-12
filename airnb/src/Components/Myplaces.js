import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../Auth/AuthContext";
import Image from "./Image";
import Perks from "./Perks";
import {ThreeDots} from "react-loader-spinner"

const Myplaces = () => {
  const { action } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addphoto, setPhoto] = useState("");
  const [photos, setExistingphoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckin] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuests, setMaxpeople] = useState("");
  const [extraInfo, setExtrainfo] = useState("");
  const [price, setPrice] = useState("");
  const [places, setPlaces] = useState([]);
  async function ImagewithLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/uploadbylink", {
      link: addphoto,
    });
    setExistingphoto((prev) => {
      return [...prev, filename];
    });
    setPhoto("");
  }

  async function uploadphoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    await axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setExistingphoto((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  const navigate = useNavigate();
  async function addNewplace(e) {
    e.preventDefault();
    const { data: responsedata } = await axios.post("/places", {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    navigate("/");
  }

  useEffect(() => {
    axios.get("/userplaces").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="h-auto">
      {action !== "new" && (
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

          {places.length > 0 ? (
            <div className="flex flex-col gap-4">
              {places.length > 0 &&
                places.map((placei) => {
                  return (
                    <Link to={`/information/accomodation/${placei._id}`}>
                      <div className="flex items-start  max-lg:flex-col max-lg:h-auto gap-2  bg-gray-300 rounded-lg   p-4 h-[180px] mt-4 mx-6">
                        {placei.photos.length > 0 && (
                          <div className="w-32 h-32 rounded-lg">
                            <img
                              className="w-full object-contain rounded-lg"
                              src={
                                "http://localhost:4000/uploads/" +
                                placei.photos[0]
                              }
                              alt="picture"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <h2 className="font-semibold">{placei.title}</h2>
                          <p className="text-[14px]">{placei.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 max-sm:flex-col h-[60vh]">
              {" "}
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
          )}
        </>
      )}
      {action === "new" && (
        <div>
          <div className="flex mx-10 mt-6 pb-6 ">
            <form className="w-full  flex-col gap-6 flex">
              <div className="flex flex-col gap-[2px]">
                <h2>Title</h2>
                <p className="text-[10px]">Title of your place</p>
                <input
                  className="border-[1px] pl-4 py-[4px] rounded-lg outline-none"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title ,for example: My appartment looks beautiful"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <h2>Address</h2>
                <p className="text-[10px]">Address to your place</p>
                <input
                  className="border-[1px] pl-4 py-[4px]  rounded-lg outline-none"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="address"
                />
              </div>
              <Image
                addphoto={addphoto}
                ImagewithLink={ImagewithLink}
                uploadphoto={uploadphoto}
                setPhoto={setPhoto}
                photos={photos}
                setExistingphoto={setExistingphoto}
              />

              <div className="flex gap-2 flex-col">
                <h2>Desciption </h2>
                <p className="text-[12px]">Description of the place</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-100 p-4 outline-none rounded-lg"
                  placeholder="description about your place"
                />
              </div>
              <Perks perks={perks} setPerks={setPerks} />
              <div className="flex flex-col  gap-[2px]">
                <h2>Extra Info</h2>
                <p className="text-[12px]">House or area</p>
                <input
                  type="text"
                  className="border-[1px] pl-4 py-[4px]  rounded-lg outline-none"
                  onChange={(e) => setExtrainfo(e.target.value)}
                />
              </div>
              <div className="flex flex-col  gap-[4px]">
                <h2>Check in and Checkout time</h2>

                <p className="text-[12px]">
                  add check in time cause it will provide us info when we do
                  cleaning
                </p>
                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                  <div>
                    <h2>Check in </h2>
                    <input
                      type="number"
                      className="border-[1px] pl-4 py-[4px] w-full rounded-lg outline-none mb-2"
                      placeholder="14:00"
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                  </div>
                  <div>
                    <h2>Check Out </h2>
                    <input
                      type="number"
                      className="border-[1px] pl-4 py-[4px] w-full  rounded-lg outline-none"
                      placeholder="12:00"
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </div>
                  <div>
                    <h2>Max number of guests</h2>
                    <input
                      type="number"
                      className="border-[1px] pl-4 py-[4px] w-full  rounded-lg outline-none"
                      placeholder="1,2"
                      onChange={(e) => setMaxpeople(e.target.value)}
                    />
                  </div>
                  <div>
                    <h2>Price per night</h2>
                    <input
                      type="number"
                      className="border-[1px] pl-4 py-[4px] w-full  rounded-lg outline-none"
                      placeholder="100"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={addNewplace}
                  className="bg-red-400 rounded-lg px-8 py-2 mt-4 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myplaces;
