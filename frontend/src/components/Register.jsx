import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'


const Register = () => {


    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword]= useState("")
    const nav = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            name:name,
            email:email,
            password:password
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.text();
            alert(JSON.stringify(result));
            nav("/login")
            console.log(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>SignUp</div>
            <div>
                <div>
                    <label >Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter your name' />
                </div>
                <div>
                    <label >Email</label>
                    <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email' />
                </div>
                <div>
                    <label >Password</label>
                    <input type="text" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your password' />
                </div>
                <button>SignUp</button>
                <label htmlFor="signIn">Already have an account? <Link to="/login">SignIn</Link></label>
            </div>
        </form>
    </div>
  )
}

export default Register