import React, { useState } from 'react'

const App = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword] = useState('')
  const handleSubmit=(e)=>{
e.preventDefault();
    if(email && password){
     
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div>
      <h1>register users</h1>
      <label>Email Address</label>
      <input type='email' placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label>Password</label>
      <input type='password' placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

      <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
