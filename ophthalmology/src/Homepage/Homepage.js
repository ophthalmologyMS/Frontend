import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import classes from './Homepage.module.css'
import NavBar from "./Components/Navbar";

export default function Homepage(){
    return(
        <div className={`container-fluid vh-100  ${classes.Home}`}>
            <div className="row">
                <NavBar />
            </div>
           
           
        </div>
    )
}