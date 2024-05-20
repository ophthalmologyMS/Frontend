import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AppointmentModal.css'; // Import your custom CSS file
import { useParams } from "react-router-dom";

const services = ["Glasses", "Contact Lenses", "Surgery", "Lasik", "Cataract"];

const AppointmentModal = ({ isOpen, onRequestClose }) => {
  const { username } = useParams();
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [availTimes, setAvailTimes] = useState([]);
  const [days, setDays] = useState([]);

  const BookApp = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/createAppointment`, { 
        patientName: username, 
        doctorName: selectedDoctor,  
        date: selectedDayOfWeek,
        time: selectedTimeSlot,
        service: selectedService 
      });
      console.log('Submitted:', { username, selectedDoctor, selectedTimeSlot, selectedDayOfWeek });
      alert("Appointment Booked");
      return response.data;
    } catch (error) {
      console.error("Error booking appointment:", error);
      return [];
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    await BookApp()
    onRequestClose(); // Close the modal
  };

  const commaSeparatedStringToArray = (str) => {
    const array = str.split(",");
    setDays(array);
  }

  const getAvailTimes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/appointments');
      return response.data;
    } catch (error) {
      console.error("Error fetching available times:", error);
      return [];
    }
  }

  const getPeriod = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/doctorAvailability/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching period for doctor ${name}:`, error);
      return null;
    }
  }

  const fetchPeriod = async (name) => {
    const data = await getPeriod(name);
    if (data) {
      setTimeSlots(data.time);
    }
  }

  const handleDoctorSelected = async (event) => {
    const doctorName = event.target.value;
    setSelectedDoctor(doctorName);
    commaSeparatedStringToArray(event.target.options[event.target.selectedIndex].getAttribute('data-days'));
    await fetchPeriod(doctorName);
  }

  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getAvailTimes();
      if (data) {
        setAvailTimes(data.availableTimeSlots);
      }
    }

    fetchInfo();
  }, []);

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
          onChange={handleDoctorSelected}
          required
        >
          <option value="">Choose a doctor</option>
          {availTimes.map((doctor) => (
            <option key={doctor.doctorName} value={doctor.doctorName} data-days={doctor.timeSlots}>
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
          {services.map((service) => (
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
          {timeSlots.map((slot) => (
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
          {days.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
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
