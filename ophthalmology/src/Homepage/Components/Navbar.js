import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './Navbar.module.css'
import { Link , useNavigate } from 'react-router-dom';
import logo from './eyes_legs_hands_freak_emoji_icon_149309.ico'
import AppointmentModal from "../../BookAppointment/AppointmentModal";
export default function NavBar(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return(
        
    <div className="row  justify-content-center">
        <div className="col-9 mt-5">
            <nav class={`navbar navbar-light bg-light ${classes.Nav}`}>
                <div class="container-fluid">
                    <a class="navbar-brand" onClick={() => navigate(-1)} href="#">
                    <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top" />
                        Very Eye-ronical!
                    </a>
                    <ul class="nav justify-content-end">
                        
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={openModal}>Book</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Test Resaults</a>
                        </li>

                    </ul>
                </div>
                <AppointmentModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            </nav>
        </div>
    </div>
    )
}