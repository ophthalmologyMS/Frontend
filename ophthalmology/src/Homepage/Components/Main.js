// Main.js
import React, { useState, useEffect } from 'react';
import classes from "./Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "./eyes_legs_hands_freak_emoji_icon_149309.ico";
import AppointmentModal from "../../BookAppointment/AppointmentModal";
import Schedule from "../../ListViewForAppointements/Schedule";
import UserModal from "../../Profile/UserModal";
import { useParams, useNavigate } from 'react-router-dom';
import DoctorAvailableTime from "../../DoctorAvailableTimes/DoctorAvailable";
import CreateAccountModal from './CreateAccountModal'; // Import the CreateAccountModal component
import DoctorsListModal from './DoctorsListModal'; // Import the DoctorsListModal component
import BillsModal from './BillsModal'; // Import the BillsModal component

export default function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { username, type } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(username);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [doctorTimeModal, setDoctorTimeModal] = useState(false);
  const [adminAvailableTime, setAdminAvailableTime] = useState(false);
  const [createAccountModalIsOpen, setCreateAccountModalIsOpen] = useState(false); // State to control CreateAccountModal visibility
  const [doctorsListModalIsOpen, setDoctorsListModalIsOpen] = useState(false); // State to control DoctorsListModal visibility
  const [billsModalIsOpen, setBillsModalIsOpen] = useState(false); // State to control BillsModal visibility

  async function getUser() {
    if (type === "patient") {
      const promise = await axios.get(`http://localhost:8000/api/patientInfo/${username}`);
      return promise.data.patient;
    } else if (type === "doctor") {
      const promise = await axios.get(`http://localhost:8000/api/doctorsInfo/${username}`);
      return promise.data;
    }
  }

  useEffect(() => {
    async function getInfo() {
      const data = await getUser();
      if (data) {
        setUser(data);
      }
    }

    getInfo();
  }, []);

  const handleAdminAvailableTime = () => {
    setAdminAvailableTime(true);
  }
  
  const closeAdminAvailableTime = () => {
    setAdminAvailableTime(false);
  }
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeDoctorTimeModal = () => {
    setDoctorTimeModal(false);
  };

  const openModal = () => {
    if (type === "doctor") {
      setDoctorTimeModal(true);
    } else {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRecord = () => {
    navigate(`/Records/${username}/${type}`)
  }

  const openBillsModal = () => {
    setBillsModalIsOpen(true);
  };

  const closeBillsModal = () => {
    setBillsModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className={`${classes.Headline}`}>
          We cover everything from this{" "}
          <img
            src={logo}
            alt=""
            width="90"
            height="90"
            className="d-inline-block align-text-top"
          />{" "}
          to this{" "}
          <img
            src={logo}
            alt=""
            width="90"
            height="90"
            className="d-inline-block align-text-top"
          />{" "}
          .
        </h1>
      </div>
      <div className="row mt-5">
        <div className="col-12 d-flex mt-5 align-items-bottom justify-content-around">
          {type !== "admin" && (
            <div className={`col-2 mt-3 ${classes.Translate}`}>
              <button className={`w-100 ${classes.MainButton}`} onClick={toggleModal}>
                Your info
              </button>
            </div>
          )}
          <div className={`mt-3 col-2 ${classes.Translate}`}>
            <button className={`w-100 ${classes.MainButton}`} onClick={handleRecord}>
              Your Records
            </button>
          </div>
          <div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
            <button className={`w-100 ${classes.MainButton}`}>
              {type === "doctor" || type === "admin" ? (
                <Schedule></Schedule>
              ) : (
                <Schedule></Schedule>
              )}
            </button>
          </div>
          {type === 'admin' ? (<></>) :(<div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
            <button className={`w-100 ${classes.MainButton}`} onClick={openModal}>
              {type === "doctor" ? "Availability time" : "Book an appointment"}
            </button>
          </div>)}
          {(type === "admin" || type === "patient") && (
            <div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
              <button className={`w-100 ${classes.MainButton}`} onClick={handleAdminAvailableTime}>
                Availability time
              </button>
            </div>
          )}
          {type === "admin" && (
            <div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
              <button className={`w-100 ${classes.MainButton}`} onClick={() => setCreateAccountModalIsOpen(true)}>
                Create Account
              </button>
            </div>
          )}
          {type === "admin" && (
            <div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
              <button className={`w-100 ${classes.MainButton}`} onClick={() => setDoctorsListModalIsOpen(true)}>
                View Doctors
              </button>
            </div>
          )}
          {type === "patient" && (
            <div className={`mt-3 col-2 ms-3 ${classes.Translate}`}>
              <button className={`w-100 ${classes.MainButton}`} onClick={openBillsModal}>
                Your bills
              </button>
            </div>
          )}
        </div>
      </div>
      {adminAvailableTime && <DoctorAvailableTime onClose={closeAdminAvailableTime} />}
      {doctorTimeModal && <DoctorAvailableTime onClose={closeDoctorTimeModal} />}
      {showModal && <UserModal user={user} onClose={toggleModal} />}
      <AppointmentModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      <CreateAccountModal isOpen={createAccountModalIsOpen} onRequestClose={() => setCreateAccountModalIsOpen(false)} />
      <DoctorsListModal isOpen={doctorsListModalIsOpen} onRequestClose={() => setDoctorsListModalIsOpen(false)} />
      <BillsModal isOpen={billsModalIsOpen} onRequestClose={closeBillsModal} username={username} />
    </div>
  );
}
