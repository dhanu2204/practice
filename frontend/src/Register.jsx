import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    fullname,email,password,phonenumber
                })
            })
            const data = await res.text();
            if(res.ok){
                alert("User registered successfully");
                navigate("/login");
            }
            else{
                alert(data);
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" name="fullname" value={fullname} onChange={(e)=>setFullname(e.target.value)} placeholder="Enter your full name" />
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
                <input type="text" name="phonenumber" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} placeholder="Enter your phone number" />
            </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Register