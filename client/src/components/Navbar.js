import React, {useContext} from 'react'
import {Link, useHistory } from 'react-router-dom'//Link causes display instantly instead of refreshing each time
import {UserContext} from '../App'

const NavBar = ()=>{
	const {state, dispatch} = useContext(UserContext)
	const history = useHistory()
	const user = JSON.parse(localStorage.getItem('user'))
	

	const renderList = () =>{
		if(state){
			if(user.resignation === 'Teacher'){
				return [
					<li><Link to="/profile">Profile</Link></li>,
					<li><Link to="/create">Create Test</Link></li>,
					<li><Link to="/tests">Write Test</Link></li>,

					<li>
						<button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
						onClick={()=>{
							localStorage.clear()
							dispatch({type:"CLEAR"})
							history.push('/signin')
						}}>
							Logout
						</button> 
					</li>
				]
			}else{
				return [
					<li><Link to="/profile">Profile</Link></li>,
					<li><Link to="/tests">Write Test</Link></li>,
					<li>
						<button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
						onClick={()=>{
							localStorage.clear()
							dispatch({type:"CLEAR"})
							history.push('/signin')
						}}>
							Logout
						</button> 
					</li>
				]
			}
		}else{
			return [
				<li><Link to="/signin">Sign in</Link></li>,
				<li><Link to="/signup">Sign up</Link></li>
			]
		}
	}
	return(
		<nav>
		<div className="nav-wrapper white">
		  <Link to={state? '/': '/signin'} className="brand-logo left">Online Exam Portal</Link>
		  <ul id="nav-mobile" className="right">
			  {renderList()}
		  </ul>
		</div>
		</nav>
	)
}

export default NavBar
