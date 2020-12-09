import React, {useEffect, useContext} from 'react'
import {UserContext} from '../../App'

const Profile=()=>{
    const {state, dispatch} = useContext(UserContext)
    var user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        user = {name: 'Hero', email: 'hera@zero.com', resignation: 'Master'}
    }
    
    useEffect(()=>{
        fetch('/mypost', {
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
        })
    }, [])
    return(
        <div>
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                }}>
                    <div>
                        <img id='profiles' style={{width:"160px", height:"160px",borderRadius:"80px"}} src = {(user.resignation === 'Student') ? 'https://tse2.mm.bing.net/th?id=OIP.NG-wH7lGaeymZeSGdhivXQHaHj&pid=Api&P=0&w=300&h=300' : 'https://tse3.mm.bing.net/th?id=OIP.j-XcnGyByYWK_w0qo-I6jwHaEK&pid=Api&P=0&w=269&h=152'} alt="profilePic"/>
                    </div>
                    <div>
                        <h4>{user.name}</h4>
                        <div style={{display:"block",justifyContent:"space-between",width:"108%"}}>
                            <h6>Email: {user.email}</h6>
                            <h6>Resignation: {user.resignation}</h6>
                            <h6>Date & Time: {new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString()}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile