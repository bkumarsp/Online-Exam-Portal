import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import Materialise from 'materialize-css'

const SignIn = ()=>{	
	const history = useHistory()
    const [password, setPassword] = useState("")
    const {token} = useParams()
	const PostData = () =>{


		fetch("/new-password",{
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                password,
                token
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
			.catch(err=>console.log(err))
		})
	}
	return (
		<div className="mycard">
		    <div className="card auth-card input-field">
              <h2>Online Exam Portal</h2>
              <input type="password" placeholder="enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
		      <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>{PostData()}}>Update Password</button> 
            </div>
		</div>
	)
}

export default SignIn