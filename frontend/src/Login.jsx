import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data = await res.text();
        if(res.ok){
            alert("Login successfull")
            navigate("/home");
            
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' />
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}

export default Login