import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Allinformaton = () => {
  const { id } = useParams();
  const [Information, setInformation] = useState([]);
  const [Loading,setLoading]=useState(false)
  useEffect(() => {
    axios.get(`/accomodation/${id}`).then(({ data }) => {
      setLoading(true)
      
        setInformation(data);
  
    
      setLoading(false)
    });
  }, []);
 

  return (
    <>
      
      <div className="absolute top-[72px]">
        
        <div>
          <h2>{Information.title}</h2>

          <div>
            <img src={"http://localhost:4000/uploads/" + Information.photos[0]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Allinformaton;
