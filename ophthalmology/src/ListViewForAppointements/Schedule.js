import React, { useState } from "react";
import Modal from "react-modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { IoCloseCircleOutline } from "react-icons/io5";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jsonData from "./mock.json"; // Importing JSON data
import { MdOutlineToday } from "react-icons/md";
import "./Schedule.css";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root"); 

const Schedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [events, setEvents] = useState(() => {
    return jsonData.appointments.map((appointment) => ({
      id: appointment.id,
      title: appointment.patient_name,
      start: new Date(
        appointment.appointment_date + " " + appointment.appointment_time_start
      ),
      end: new Date(
        appointment.appointment_date + " " + appointment.appointment_time_end
      ),
      reason: appointment.reason,
    }));
  });

  const workingHours = {
    start: moment().set({ hour: 7, minute: 0, second: 0 }),
    end: moment().set({ hour: 23, minute: 59, second: 59 }),
  };
  
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      if (toolbar.view === "day") {
        toolbar.date.setDate(toolbar.date.getDate() - 1); // Go back by a day
      } else if (toolbar.view === "week") {
        toolbar.date.setDate(toolbar.date.getDate() - 7); // Go back by a week
      } else {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1); // Go back by a month
      }
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      if (toolbar.view === "day") {
        toolbar.date.setDate(toolbar.date.getDate() + 1); // Go forward by a day
      } else if (toolbar.view === "week") {
        toolbar.date.setDate(toolbar.date.getDate() + 7); // Go forward by a week
      } else {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1); // Go forward by a month
      }
      toolbar.onNavigate("next");
    };

    const goToToday = () => {
      let updatedToolbar = { ...toolbar }; // Create a copy of toolbar
  
      // Set the date to today for different views
      if (toolbar.view === "day") {
        updatedToolbar.date = new Date();
      } else if (toolbar.view === "week") {
        // If the view is week, set the date to the start of the current week
        const firstDayOfWeek = moment().startOf('week').toDate();
        updatedToolbar.date = firstDayOfWeek;
      } else if (toolbar.view === "month") {
        // If the view is month, set the date to the start of the current month
        const firstDayOfMonth = moment().startOf('month').toDate();
        updatedToolbar.date = firstDayOfMonth;
      }
  
      toolbar.onNavigate("today", updatedToolbar.date); // Pass updated date to onNavigate
    };

    return (
      <div className="rbc-toolbar">
        <div className="rbc-header-one">
          <div className="rbc-header-one-inside">
            <button type="button" onClick={goToBack} className="nav-button">
              <svg
                className="nav-icon"
                style={{ width: "25px", height: "25px" }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L12.4142 13H22C22.5523 13 23 13.4477 23 14C23 14.5523 22.5523 15 22 15H12.4142L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L15.2929 7.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {toolbar.label}
            <button type="button" className="nav-button" onClick={goToNext}>
              <svg
                className="nav-icon"
                style={{ width: "25px", height: "25px" }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.29289 7.70711C8.90237 7.31658 8.90237 6.68342 9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289L16.7071 12.2929C17.0976 12.6834 17.0976 13.3166 16.7071 13.7071L10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071C8.90237 19.3166 8.90237 18.6834 9.29289 18.2929L13.5858 14H3C2.44772 14 2 13.5523 2 13C2 12.4477 2.44772 12 3 12H13.5858L9.29289 7.70711Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <button type="button" className="today-button" onClick={goToToday}>
            <MdOutlineToday style={{ width: "20px", height: "20px" }} />
          </button>
        </div>
        <div className="rbc-header-two">
          <button type="button" onClick={() => toolbar.onView("day")}>
            Day
          </button>
          <button type="button" onClick={() => toolbar.onView("week")}>
            Week
          </button>
          <button type="button" onClick={() => toolbar.onView("month")}>
            Month
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Open Schedule</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Appointment Schedule"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "800px",
            maxHeight: "90vh",
          },
        }}
      >
        <div className="modal-header">
          <h2>Ophthalmology Appointment Schedule</h2>
          <IoCloseCircleOutline
            className="close-button"
            onClick={() => setModalIsOpen(false)}
          />
        </div>
        <div style={{ width: 700, height: 700 }}>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            defaultView="day"
            views={["month", "week", "day"]}
            min={workingHours.start.toDate()}
            max={workingHours.end.toDate()}
            components={{ toolbar: CustomToolbar }}
          />

        </div>
      </Modal>
    </div>
  );
};

export default Schedule;