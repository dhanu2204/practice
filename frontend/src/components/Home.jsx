import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const[message,setMessage]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token)
        {
            navigate("/login")
            return;
        }
        const fetchHomeData = async()=>{
            try{
                const response = await fetch(`${import.meta.env.VITE_HOME_URL}/api/home`,{
                    method:'GET',
                    headers:{
                        'Authorization':`Bearer ${token}`,
                    }
                });
                const result = await response.text();
                if(response.status === 401)
                {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }
                else{
                    setMessage(result);
                }
            }
            catch(error)
            {
                setMessage("Could not connect to service");
            }
        };
        fetchHomeData();
    },[navigate])
  return (
    <div>
        <h1>welcome home</h1>
        <h2>{message}</h2>
        <button onClick={()=>{
            localStorage.removeItem("token");
            navigate("/login")
        }}>Logout</button>
    </div>
  )
}

export default Home