import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Materialise from 'materialize-css'

const SignUp = ()=>{
	const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const history = useHistory()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [resignation, setResignation] = useState("")
	const PostData = () =>{

		if (!emailValidation.test(email)) {
			Materialise.toast({html: "Invalid email", classes:"#ff3d00 deep-orange accent-3"}) 
			return;
		}

		fetch("http://localhost:3000/signup",{
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				password,
				resignation
			})
}).then(res=>res.json().then(data=>{
	if(data.error){
		Materialise.toast({html: data.error, classes:"#ff1744 red accent-3"})
	}else{
		Materialise.toast({html: data.message, classes:"#7cb342 light-green darken-1" })
		history.push('/signin')
	}
})).catch(err=>console.log(err))
	}
	
	return (
		<div className="mycard">
		    <div className="card auth-card input-field">
              <h2>Online Exam Portal </h2>
		      <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} /> 
		      <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> 
		      <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
			  <p>
				<label>
					<input className="with-gap" name="resignation" type="radio" value="Student" onChange={(e)=>setResignation(e.target.value)} />
					<span>Student</span>
				</label>
			  </p>
				<p>
				<label>
					<input className="with-gap" name="resignation" type="radio" value="Teacher" onChange={(e)=>setResignation(e.target.value)} />
					<span>Teacher</span>
				</label>
			  </p>
		      <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>PostData()}>Sign Up</button>  
		      <h5>
			  	<Link to="/signin">Already have an account ?</Link>	                               
			  </h5>
            </div>
		</div>
	)
}

export default SignUp