import React from "react";
import classes from './Main.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import pic1 from './1.png'
import pic2 from './2.png'
import pic3 from './3.png'
import pic4 from './4.png'
import logo from './eyes_legs_hands_freak_emoji_icon_149309.ico'


export default function Main(){


    return(
       <div className="container  ">
            <div className="row mt-5">
                <h1 className={`${classes.Headline}`}>We cover everything from this <img src={logo} alt="" width="90" height="90" class="d-inline-block align-text-top" /> to this <img src={logo} alt="" width="90" height="90" class="d-inline-block align-text-top" /> .</h1>
            </div>
            <div className="row mt-5">
                <div className="col-12 d-flex mt-5 align-items-bottom justify-content-around">
                    <div className={` col-2 mt-3 ${classes.Translate}`}>
                        <button className={` w-100 ${classes.MainButton} `}>Your Appoitments</button>
                    </div>
                    <div className={` mt-3 col-2 ${classes.Translate}`}>
                        <button className={`w-100 ${classes.MainButton} `}>Your Records</button>
                    </div>
                    <div className={` mt-3 col-2 ${classes.Translate}`}>
                        <button className={` w-100 ${classes.MainButton} `}>Billing Info</button>
                    </div>
                    <div className={`mt-3 col-2 ${classes.Translate}`}>
                        <button className={`w-100 ${classes.MainButton} `}>Book an Appointments</button>
                    </div>
                </div>
            </div>

       </div>
    )
}