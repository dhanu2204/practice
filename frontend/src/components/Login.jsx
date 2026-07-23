import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin =async(e)=>{

        e.preventDefault();
        const data = {
            email: email,
            password:password
        }
        try{
             const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await response.text();
        if(!result.includes("Error")&& !result.includes("User Not Exists") && !result.includes("Invalid Password"))
        {
            localStorage.setItem("token",result);
            navigate("/home")
        }
        else{
            console.log(result);
            alert(result);
        }
        }
        catch(error){
            console.log(error);
        }
    }
    
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                <label>SignIn</label>
            </div>
            <div>
                <label>emailId</label>
                <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='@email.com'/>
            </div>
            <div>
                <label>password</label>
                <input type="text" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='*****'/>
            </div>
            <div>
                <button>SignIn</button>
                <label htmlFor="signUp">Dont have an account? <Link to="/register">SignUp</Link></label>
            </div>
        </form>
    </div>
  )
}

export default Login