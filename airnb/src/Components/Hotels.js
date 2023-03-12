import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'

const Hotels =() => {
  const [places,setPlaces]=useState([])
   useEffect(()=>{
    axios.get("/allplaces").then((response)=>{
     setPlaces([...response.data,...response.data])
    })
   },[])
   if(places.length===0){
    return <div className='flex items-center justify-center h-[50vh]'><ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="gray" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
     /></div>
   }
  return (
  <div className='relative top-[72px] bottom-0 right-0  left-0'>
    <div className='grid grid-cols-4   p-6 max-lg:grid-cols-3 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2'>
    {
      places.map((hotels)=>{
        return<Link to={"/information/accomodation/"+ hotels._id}><div className=' flex items-start justify-start flex-col gap-[4px]'>
          <img className='rounded-2xl object-cover aspect-square' src={"http://localhost:4000/uploads/"+ hotels.photos[0]}/>
          <span className="font-bold ">{hotels.address}</span>
          <p className='text-[14px] text-slate-500'>{hotels.description.substring(0,24)}...</p>
          <p className='text-[14px] text-slate-500'>{hotels.extraInfo}</p>
          <p className='font-bold text-[14px]'>$ {hotels.price} price per night</p>
          </div>
          </Link>
          

      })
    }


    </div>
    </div>
  )
}

export default Hotels