import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EditAvailabilityTimes.css";

Modal.setAppElement("#root");

const EditAvailabilityTimes = ({ onClose, Events,onEventsChange }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { username } = useParams();

  // Helper function to get the index of the selected day
  const getDayIndex = (day) => {
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return dayMap[day];
  };

  // Helper function to get the time slot based on start hour
  const getTimeSlot = (startHour) => {
    const timeMap = {
      9: 'Morning',
      12: 'Afternoon',
      17: 'Evening'
    };
    return timeMap[startHour];
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedDay || !selectedTime) {
      toast.error("Day / time slot not selected!");
      return;
    }

    const newEventTitle = `Dr. ${username} Available`;
  
    const dayIndex = getDayIndex(selectedDay);
    const startHour = selectedTime === 'Morning' ? 9 : (selectedTime === 'Afternoon' ? 12 : 17);
    const timeSlot = getTimeSlot(startHour);
  
    const eventExists = Events.some(event =>
      event.start.toLocaleString('en-US', { weekday: 'long' }) === selectedDay &&
      getTimeSlot(event.start.getHours()) === timeSlot
    );
  
    if (!eventExists) {
      const body = {
        name: username,
        days: [...Events.map(event => event.start.toLocaleString('en-US', { weekday: 'long' })), selectedDay],
        time: [...Events.map(event => getTimeSlot(event.start.getHours())), timeSlot],
      };
  
      try {
        const response = await fetch("http://localhost:8000/api/editAvailability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        toast.success("Time slot added successfully!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add time slot.");
      }
    } else {
      toast.warning("It is already set available!");
    }
    onEventsChange();
  };

  const handleRemove = async () => {
    if (!selectedDay || !selectedTime) {
      toast.error("Day / time slot not selected!");
      return;
    }

    const dayIndex = getDayIndex(selectedDay);
    const startHour = selectedTime === 'Morning' ? 9 : (selectedTime === 'Afternoon' ? 12 : 17);
    const timeSlot = getTimeSlot(startHour);
  
    const eventIndex = Events.findIndex(event =>
      event.start.toLocaleString('en-US', { weekday: 'long' }) === selectedDay &&
      getTimeSlot(event.start.getHours()) === timeSlot
    );
  
    if (eventIndex !== -1) {
      const updatedEvents = [...Events];
      updatedEvents.splice(eventIndex, 1);
  
      const body = {
        name: username,
        days: updatedEvents.map(event => event.start.toLocaleString('en-US', { weekday: 'long' })),
        time: updatedEvents.map(event => getTimeSlot(event.start.getHours())),
      };
  
      try {
        const response = await fetch("http://localhost:8000/api/editAvailability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        toast.success("Time slot removed successfully!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to remove time slot.");
      }
    } else {
      toast.warning("This event does not exist!");
    }
    onEventsChange();
  };
  
  

  return (
    <div>
      <Modal
        isOpen={true}
        contentLabel="Schedule Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "40%",
          },
        }}
      >
        <IoCloseCircleOutline className="close-button" onClick={onClose} />
        <div className="edit-day">
          <label htmlFor="day-options">Day:</label>
          <select id="day-options" value={selectedDay} onChange={handleDayChange}>
            <option value="" disabled>
              Select a day
            </option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="edit-time">
          <label htmlFor="time-options">Time-Slot:</label>
          <select id="time-options" value={selectedTime} onChange={handleTimeChange}>
            <option value="" disabled>
              Select a time slot
            </option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="editing-available-time">
        <button onClick={handleSubmit}>Add</button>
        <button onClick={handleRemove}>Remove</button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditAvailabilityTimes;
