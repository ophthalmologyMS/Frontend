import React, { useState } from 'react';
import classes from './Main.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from './eyes_legs_hands_freak_emoji_icon_149309.ico'
import AppointmentModal from '../../BookAppointment/AppointmentModal';
import Schedule from '../../ListViewForAppointements/Schedule';
import UserModal from '../../Profile/UserModal';
import {useParams} from "react-router-dom"
import { Link } from 'react-router-dom';

export default function Main(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {username} = useParams();
    const {type} = useParams()
    const [role, setRole] = useState(username)
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState()
  async function getUser(){
    if(type == "patient"){
        const promise = await axios.get(`http://localhost:8000/api/patientInfo/${username}`)
        return promise.data.patient
    }else if(type == "doctor"){
        const promise = await axios.get(`http://localhost:8000/api/doctorsInfo/${username}`)
        return promise.data
    }
}

  React.useEffect(()=>{
    async function getInfo(){
        const data = await getUser()
        if(data){
            console.log(data)
            setUser(data)
        }
    }

    getInfo()
  },[])

  const toggleModal = () => {
    setShowModal(!showModal);
  };
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // async function userRole(){
    //     console.log(username)
    //     const promise = await axios.get('http://localhost:8000/api/checkUsername',{name:username})
    //     return promise.data
    // }

    // React.useEffect(()=>{
    //     async function getRole(){
    //         const data = await userRole()
    //         if(data){
    //             setRole(data.message)
    //         }
    //     }

    //     getRole()
    // },[])

    return(
       <div className="container  ">
            <div className="row mt-5">
                <h1 className={`${classes.Headline}`}>We cover everything from this <img src={logo} alt="" width="90" height="90" class="d-inline-block align-text-top" /> to this <img src={logo} alt="" width="90" height="90" class="d-inline-block align-text-top" /> .</h1>
            </div>
            <div className="row mt-5">
                <div className="col-12 d-flex mt-5 align-items-bottom justify-content-around">
                    <div className={` col-2 mt-3 ${classes.Translate}`}>
                        <button className={` w-100 ${classes.MainButton} `} onClick={toggleModal}>Your info</button>
                    </div>
                    <div className={` mt-3 col-2 ${classes.Translate}`}>
                        <Link to={'/Records'}>
                             <button className={`w-100 ${classes.MainButton} `}>Your Records</button>
                        </Link>
                    </div>
                    <div className={` mt-3 col-2 ${classes.Translate}`}>
                        <button className={` w-100 ${classes.MainButton} `} >{type == "doctor" ? (<Schedule></Schedule>):
                        (<>{type == "patient" ? (<>Your Appointments</>):
                        
                        (<>{type == "admin" ? (<>All your appointments</>):(<></>)}</>)}</>)
                        
                        }</button>
                    </div>
                    <div className={`mt-3 col-2 ${classes.Translate}`}>
                        <button className={`w-100 ${classes.MainButton} `} onClick={openModal}>Book an Appointments</button>
                    </div>
                </div>
            </div>
            {showModal && <UserModal user={user} onClose={toggleModal} />}
            <AppointmentModal isOpen={modalIsOpen} onRequestClose={closeModal} />
       </div>
    )
}