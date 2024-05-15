// AppointmentModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AppointmentModal.css'; // Import your custom CSS file

const service = ["Glasses", "Contact Lenses", "Surgery", "Lasik", "Cataract"];
const timeSlot = ["Morning", "Afternoon", "Evening"]; // Available time slots

const AppointmentModal = ({ isOpen, onRequestClose }) => {
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
  const [availTimes, setAvailTimes] = useState([]);
  const [days, setDays] = useState()  
  const [daysOfWeek ,setDaysofWeek] = useState([])
  const [Doctor, setDoctor] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Submitted:', { patientName, selectedDoctor, selectedTimeSlot, selectedDayOfWeek });
    onRequestClose(); // Close the modal
  };

  async function commaSeparatedStringToArray(str) {
     const set = await setDays(str.split(","))

  }

  async function getAvailTimes(){
    const promise = await axios.get('http://localhost:8000/api/appointments');
    
    return promise.data
  }

  function handleDoctorTimeSlots(doctor){
    console.log(doctor)
  }
  useEffect(()=>{
    async function getInfo(){
        const data = await getAvailTimes()
        if(data){
            setAvailTimes(data.availableTimeSlots)
        }
    }

    getInfo()
  },[])
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Schedule Appointment"
      style={{
        content: {
          width: '50%', // Adjust the modal width as needed
          maxHeight: '65vh', // Limit the modal height
          margin: 'auto',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        },
      }}
    >
      <h2 className="modal-title">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctorName">Select Doctor:</label>
        <select
          id="doctorName"
          value={selectedDoctor}
          onChange={(e) => {setSelectedDoctor(e.target.key);commaSeparatedStringToArray(e.target.value); handleDoctorTimeSlots(e.target.key)}}
          required
        >
          <option value="">Choose a doctor</option>
          {availTimes.map((doctor) => (
            <option key={doctor.doctorName} fadi={doctor.time[0]} value={doctor.timeSlots}>
              {doctor.doctorName}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="ServiceName">Select Service:</label>
        <select
          id="ServiceName"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Choose a service</option>
          {service.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="timeSlot">Select Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          required
        >
          <option value="">Choose a time slot</option>
          {timeSlot.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="dayOfWeek">Select Day of the Week:</label>
        <select
          id="dayOfWeek"
          value={selectedDayOfWeek}
          onChange={(e) => setSelectedDayOfWeek(e.target.value)}
          required
        >
          <option value="">Choose a day</option>
          {days && (<>
          
            {days.map((item)=>(
              <option key={item} value={item}>
              {item}
            </option>
            ))}
          </>)}
        </select>
        <br />
        <button type="submit" className="submit-button">
          Schedule
        </button>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
