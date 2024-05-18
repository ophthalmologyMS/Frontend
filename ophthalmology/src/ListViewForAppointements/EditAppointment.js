import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const EditAvailabilityTimes = ({
  onClose,
  Events,
  selectedEvent,
  onUpdateEvent,
}) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { username, type } = useParams();

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const onEdit = async () => {
    if (!selectedDay || !selectedTime) {
      toast.error("Please select both a day and a time slot.");
      return;
    }
  
    const payload = {
      appointmentId: selectedEvent.id,
      patientName: selectedEvent.title.split(" - ")[1].split(" (")[0],
      doctorName: selectedEvent.title.split(" - ")[0].split("Dr. ")[1],
      newDate: selectedDay,
      newTime: selectedTime,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/appointments/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success("Appointment updated successfully!");
  
        // Create the updated event object
        const updatedEvent = {
          ...selectedEvent,
          start: new Date(`${selectedDay} ${selectedTime === 'Morning' ? '09:00' : selectedTime === 'Afternoon' ? '12:00' : '17:00'}`),
          end: new Date(`${selectedDay} ${selectedTime === 'Morning' ? '12:00' : selectedTime === 'Afternoon' ? '17:00' : '22:00'}`),
        };
  
        // Update the events in the parent component
        onUpdateEvent(updatedEvent);
  
        onClose(); // Close the modal after successful update
      } else {
        throw new Error(data.message || "Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error.message);
      toast.error("Error updating appointment. Please try again.");
    }
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
            height: "45%",
          },
        }}
      >
        <IoCloseCircleOutline className="close-button" onClick={onClose} />
        <div className="edit-day">
          <label htmlFor="day-options">Day:</label>
          <select
            id="day-options"
            value={selectedDay}
            onChange={handleDayChange}
          >
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
          <select
            id="time-options"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="" disabled>
              Select a time slot
            </option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditAvailabilityTimes;
