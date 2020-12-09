import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import Materialise from 'materialize-css'

const SignIn = ()=>{	
	const {state, dispatch} = useContext(UserContext)
	const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const PostData = () =>{

		if (!emailValidation.test(email)) {
			Materialise.toast({html: "Invalid email", classes:"#ff3d00 deep-orange accent-3"}) 
			return;
		}

		fetch("signin",{
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(res=>{
			res.json()
			.then(data=>{
				if(data.error){
					Materialise.toast({html: data.error, classes:"#ff1744 red accent-3"})
				}else{
					localStorage.setItem('jwt', data.token)
					localStorage.setItem('user', JSON.stringify(data.user))
					dispatch({type:"USER", payload: data.user})
					Materialise.toast({html: "Signed In successfully", classes:"#7cb342 light-green darken-1" })
					history.push('/')
				}
			})
			.catch(err=>console.log(err))
		})
	}
	return (
		<div className="mycard">
		    <div className="card auth-card input-field">
              <h2>Online Exam Portal</h2>
			  <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> 
		      <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
		      <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>{PostData()}}>Login</button> 
			  <h6>
			  <Link to="/reset">Forgot password?</Link>
			  </h6>
		      <h5>
			  <Link to="/signup">Don't have an account ?</Link>	                               
			  </h5>                     
			  
            </div>
		</div>
	)
}

export default SignIn