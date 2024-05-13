import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './Navbar.module.css'
import logo from './eyes_legs_hands_freak_emoji_icon_149309.ico'

export default function NavBar(){
    return(
    <div className="row  justify-content-center">
        <div className="col-9 mt-5">
            <nav class={`navbar navbar-light bg-light ${classes.Nav}`}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                    <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top" />
                        Very Eye-ronical!
                    </a>
                        <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Book</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Test Resaults</a>
                        </li>

                    </ul>
                </div>
               
            </nav>
        </div>
    </div>
    )
}