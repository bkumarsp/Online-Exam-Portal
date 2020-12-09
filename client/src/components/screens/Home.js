import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
const Home=()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    //comment to be removed
    // const deletePost = (postid) =>{
    //     fetch(`/deletepost:postId/${postid}`,{
    //         method:"delete",
    //         headers:{
    //             Authorization: "Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result);
    //         const newData = data.filter(item=>{
    //             return item._id !== result._id
    //         })
    //         setData(newData)
    //     })
    // }


    return(
        <div className="home">
            <div id="aboutproject">
                <h4 id='hh4'>About the project:</h4>
                <p className='hpara'><span className="names">Online Exam Portal</span>, a simple platform to create and post MCQ based test.
                    Teacher will be authorised to create new test, and every student account will be able to access the latest test.
                    <br/><br/>
                    Two fields of Login credentials: <br/>
                        1. Student <br/>
                        2. Teacher <br/>
                </p>
            </div>
            <div id="seperator"></div>
            
            <div id="aboutUs">
                <h3 id='hh3'>About Us:</h3>
                <hr/>
                <p className='hpara'>
                    <strong><span className="names">Bharath Kumar S P</span>, </strong> worked on major fields in the project. 
                        Also worked on authorizing registered users in this exam-portal, and validation of email id.
                        Plus played a major role in creating and posting new tests.
                </p>
                <br/>
                <p className='hpara'>
                    <strong><span className="names">B Pravena</span></strong>, developed sign_up / sign_in system for this exam-portal.
                        Worked on storing user credentials onto the database and validating of duplicate IDs.
                </p>
                <br/>
                <p className='hpara'>
                    <strong><span className="names">Bhuvantej R</span> </strong>, developed on profile and logout system in the project. 
                        Worked on retrieving user credentials and storing them onto localStorage for uninterupted workflow of user for a session.
                </p>
                <br/>
                <p className='hpara'>
                    <strong><span className="names">Disha B S </span></strong>, worked on major routing system of this project. 
                        Also worked on validating the users login credentials, and various in-app navigation based on user interaction with portal's UI.
                        Plus played a major role in verifing the presence of user details in the Database.
                </p>
            </div>
        </div>
    )
}

export default Home