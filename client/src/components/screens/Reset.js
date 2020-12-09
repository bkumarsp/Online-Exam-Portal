import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Materialise from 'materialize-css'

const Reset = ()=>{	
	const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const history = useHistory()
	const [email, setEmail] = useState("")
	const PostData = () =>{

		if (!emailValidation.test(email)) {
			Materialise.toast({html: "Invalid email", classes:"#ff3d00 deep-orange accent-3"}) 
			return;
		}

		fetch("/reset-password",{
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email
			})
		})
		.then(res=>{
			res.json()
		.then(data=>{
			if(data.error){
				Materialise.toast({html: data.error, classes:"#ff1744 red accent-3"})
			}else{
				Materialise.toast({html: data.message, classes:"#7cb342 light-green darken-1" })
				history.push('/signin')
			}
		})
	})
	.catch(err=>console.log(err))
	}
	return (
		<div className="mycard">
		    <div className="card auth-card input-field">
              <h2>Online Exam Portal</h2>
			  <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> 
		      <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>{PostData()}}>Reset password</button> 
			  
            </div>
		</div>
	)
}

export default Reset