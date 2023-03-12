import React from "react";

const Image = ({
  setPhoto,
  photos,
  setExistingphoto,
  addphoto,
  ImagewithLink,
  uploadphoto,
}) => {
  function hanldleDelete(e, deleteid) {
    e.preventDefault();
    setExistingphoto([...photos.filter((picture) => picture !== deleteid)]);
  }
  function hanldleMain(e,filename) {
    e.preventDefault();
    setExistingphoto([
      filename,
      [...photos.filter((picture) => picture !== filename)],
    ]);
  }
  return (
    <>
      <div className="flex flex-col gap-[2px]  ">
        <h2>Photos</h2>
        <p className="text-[10px]">More = better</p>
        <div className="flex gap-2">
          <input
            className="border-[1px] pl-4 py-[4px] w-full   rounded-lg outline-none"
            type="text"
            placeholder={"add using link ......"}
            onChange={(e) => setPhoto(e.target.value)}
            value={addphoto}
          />
          <button
            onClick={ImagewithLink}
            className="border-none bg-gray-300 rounded-lg w-[150px] py-[4x] text-[12px]"
          >
            Add photo
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2   max-md:flex-col gap-4">
        {photos &&
          photos.map((link) => (
            <div className="flex items-center justify-start relative ">
              <div className="h-[180px]  ">
                <img
                  className="w-full h-full  object-cover rounded-lg"
                  src={"http://localhost:4000/uploads/" + link}
                  alt="pic"
                />
              </div>
              <svg
                onClick={(e) => hanldleDelete(e, link)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white cursor-pointer absolute bottom-[8px] right-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <svg
                onClick={(e) => hanldleMain(e, link)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white cursor-pointer absolute bottom-[8px] left-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
          ))}
        <label className="border bg-transparent cursor-pointer rounded-2xl p-8 flex justify-around items-center gap-4 ">
          <input
            type="file"
            onChange={uploadphoto}
            multiple
            className="hidden"
          />
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
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
          upload
        </label>
      </div>
    </>
  );
};

export default Image;
