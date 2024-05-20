import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { IoCloseCircleOutline } from "react-icons/io5";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MdOutlineToday } from "react-icons/md";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { FaExchangeAlt } from "react-icons/fa";
import EditAppointment from "./EditAppointment.js";
import 'react-toastify/dist/ReactToastify.css';
import "./Schedule.css";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const Schedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const[editAppointment,setEditAppointment] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { username } = useParams();
  const { type } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/allAppointments"
        );
        const data = await response.json();
        if (data.success) {
          let filteredAppointments = data.appointments;
          if (type === "doctor") {
            filteredAppointments = data.appointments.filter(
              (appointment) => appointment.doctorName === username
            );
          } else if (type === "patient") {
            filteredAppointments = data.appointments.filter(
              (appointment) => appointment.patientName === username
            );
          }
          const formattedEvents = filteredAppointments
            .map((appointment) => {
              const dayOfWeek = moment().day(appointment.date);

              if (!dayOfWeek.isValid()) {
                console.error(`Invalid date format: ${appointment.date}`);
                return null; // Skip invalid dates
              }

              let startTime;
              let endTime;

              if (appointment.time === "Morning") {
                startTime = dayOfWeek
                  .clone()
                  .set({ hour: 9, minute: 0, second: 0 })
                  .toDate();
                endTime = dayOfWeek
                  .clone()
                  .set({ hour: 12, minute: 0, second: 0 })
                  .toDate();
              } else if (appointment.time === "Afternoon") {
                startTime = dayOfWeek
                  .clone()
                  .set({ hour: 12, minute: 0, second: 0 })
                  .toDate();
                endTime = dayOfWeek
                  .clone()
                  .set({ hour: 17, minute: 0, second: 0 })
                  .toDate();
              } else if (appointment.time === "Evening") {
                startTime = dayOfWeek
                  .clone()
                  .set({ hour: 17, minute: 0, second: 0 })
                  .toDate();
                endTime = dayOfWeek
                  .clone()
                  .set({ hour: 22, minute: 0, second: 0 })
                  .toDate();
              } else {
                console.error(`Invalid time of day: ${appointment.time}`);
                return null; // Skip invalid time of day
              }

              return {
                id: appointment._id,
                title:
                  type === "doctor"
                    ? `Dr. ${appointment.doctorName} - ${appointment.patientName} (${appointment.Service})`
                    : `Dr. ${appointment.doctorName} - ${appointment.patientName} (${appointment.Service})`,
                start: startTime,
                end: endTime,
                reason: appointment.Service,
                isDone: appointment.isDone || false, // Initialize isDone property
              };
            })
            .filter((event) => event !== null); // Filter out invalid events

          // Initialize the color property for each event in the state
          const formattedEventsWithColor = formattedEvents.map((event) => ({
            ...event,
            color: event.isDone ? "green" : "blue", // Set color based on the isDone property
          }));

          setEvents(formattedEventsWithColor);
          console.log("Formatted events with color:", formattedEventsWithColor);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };



    fetchAppointments();
  }, [type, username,editAppointment]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/allAppointments"
      );
      const data = await response.json();
      if (data.success) {
        let filteredAppointments = data.appointments;
        if (type === "doctor") {
          filteredAppointments = data.appointments.filter(
            (appointment) => appointment.doctorName === username
          );
        } else if (type === "patient") {
          filteredAppointments = data.appointments.filter(
            (appointment) => appointment.patientName === username
          );
        }
        const formattedEvents = filteredAppointments
          .map((appointment) => {
            const dayOfWeek = moment().day(appointment.date);

            if (!dayOfWeek.isValid()) {
              console.error(`Invalid date format: ${appointment.date}`);
              return null; // Skip invalid dates
            }

            let startTime;
            let endTime;

            if (appointment.time === "Morning") {
              startTime = dayOfWeek
                .clone()
                .set({ hour: 9, minute: 0, second: 0 })
                .toDate();
              endTime = dayOfWeek
                .clone()
                .set({ hour: 12, minute: 0, second: 0 })
                .toDate();
            } else if (appointment.time === "Afternoon") {
              startTime = dayOfWeek
                .clone()
                .set({ hour: 12, minute: 0, second: 0 })
                .toDate();
              endTime = dayOfWeek
                .clone()
                .set({ hour: 17, minute: 0, second: 0 })
                .toDate();
            } else if (appointment.time === "Evening") {
              startTime = dayOfWeek
                .clone()
                .set({ hour: 17, minute: 0, second: 0 })
                .toDate();
              endTime = dayOfWeek
                .clone()
                .set({ hour: 22, minute: 0, second: 0 })
                .toDate();
            } else {
              console.error(`Invalid time of day: ${appointment.time}`);
              return null; // Skip invalid time of day
            }

            return {
              id: appointment._id,
              title:
                type === "doctor"
                  ? `Dr. ${appointment.doctorName} - ${appointment.patientName} (${appointment.Service})`
                  : `Dr. ${appointment.doctorName} - ${appointment.patientName} (${appointment.Service})`,
              start: startTime,
              end: endTime,
              reason: appointment.Service,
              isDone: appointment.isDone || false, // Initialize isDone property
            };
          })
          .filter((event) => event !== null); // Filter out invalid events
          console.log("Formatted events:", formattedEvents);

        // Initialize the color property for each event in the state
        const formattedEventsWithColor = formattedEvents.map((event) => ({
          ...event,
          color: event.isDone ? "green" : "blue", // Set color based on the isDone property
        }));

        setEvents(formattedEventsWithColor);
        console.log("Formatted events with color:", formattedEventsWithColor);
      } else {
        throw new Error("Failed to fetch appointments");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (event) => {
    console.log("Selected event : ", event);
    if (type === "doctor" || type === "admin") {
      setSelectedEvent(event);
    }
  };
  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  const markAppointmentCanceled = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/cancelAppointment/${selectedEvent.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          const updatedEvents = events.filter((event) => event.id !== selectedEvent.id); // Remove the canceled event from the events array
          setEvents(updatedEvents); // Update the events state
          toast.success("Appointment canceled successfully");
        } else {
          throw new Error("Failed to mark appointment as canceled");
        }
      } catch (error) {
        console.error("Error marking appointment as canceled:", error.message);
      } finally {
        setSelectedEvent(null); // Clear selected event
      }
    }
  };
  

  const markAppointmentDone = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/appointments/markDone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: selectedEvent.id }),
          }
        );
        const data = await response.json();
        if (data.success) {
          // Generate bill after marking appointment as done
          await generateBill(selectedEvent.id);
  
          const updatedEvents = events.map((event) => {
            if (event.id === selectedEvent.id) {
              return {
                ...event,
                color: "green", // Change color to green to indicate it's done
                isDone: true, // Update the isDone property
              };
            }
            return event;
          });
          setEvents(updatedEvents); // Update the events state
        } else {
          throw new Error("Failed to mark appointment as done");
        }
      } catch (error) {
        console.error("Error marking appointment as done:", error.message);
      } finally {
        setSelectedEvent(null); // Clear selected event
      }
    }
  };
  
  const generateBill = async (appointmentId) => {
    try {
      const response = await fetch("http://localhost:8000/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentID:appointmentId }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Bill generated successfully");
      } else {
        throw new Error("Failed to generate bill");
      }
    } catch (error) {
      console.error("Error generating bill:", error.message);
    }
  };
  
  

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {};

    if (event.isDone) {
      style = {
        backgroundColor: "green",
        color: "white",
      };
    } else {
      style = {
        backgroundColor: "#0045AC",
        color: "white",
      };
    }

    return {
      style,
    };
  };

  const workingHours = {
    start: moment().set({ hour: 7, minute: 0, second: 0 }).toDate(),
    end: moment().set({ hour: 23, minute: 59, second: 59 }).toDate(),
  };

  const handleEditAppointment = async () => {
    setEditAppointment(true);
    console.log(55)
    await fetchAppointments();
  }

  const closeEditAppointmentModal = () => { 
    setEditAppointment(false);
  }
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      if (toolbar.view === "day") {
        toolbar.date.setDate(toolbar.date.getDate() - 1);
      } else if (toolbar.view === "week") {
        toolbar.date.setDate(toolbar.date.getDate() - 7);
      } else {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      }
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      if (toolbar.view === "day") {
        toolbar.date.setDate(toolbar.date.getDate() + 1);
      } else if (toolbar.view === "week") {
        toolbar.date.setDate(toolbar.date.getDate() + 7);
      } else {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      }
      toolbar.onNavigate("next");
    };

    const goToToday = () => {
      let updatedToolbar = { ...toolbar };

      if (toolbar.view === "day") {
        updatedToolbar.date = new Date();
      } else if (toolbar.view === "week") {
        const firstDayOfWeek = moment().startOf("week").toDate();
        updatedToolbar.date = firstDayOfWeek;
      } else if (toolbar.view === "month") {
        const firstDayOfMonth = moment().startOf("month").toDate();
        updatedToolbar.date = firstDayOfMonth;
      }

      toolbar.onNavigate("today", updatedToolbar.date);
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
                xmlns="http://
www.w3.org/2000/svg"
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
      <a onClick={() => setModalIsOpen(true)}>Your appointments</a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Schedule Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
          },
        }}
      >
        <div>
        <a
          onClick={() => setModalIsOpen(false)}
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <IoCloseCircleOutline className="close-button" />
        </a>
        </div>
        <div style={{ height: "95%", width: "100%" }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              defaultView="day"
              views={["month", "week", "day"]}
              min={workingHours.start}
              max={workingHours.end}
              components={{ toolbar: CustomToolbar }}
              selectable={true}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter} // Add this line
            />
          )}
        </div>
        {selectedEvent && (type === "doctor" || type === "admin") && (
          <div className="marking-buttons">
          <button onClick={markAppointmentDone}>Mark as Done <IoCheckmarkDoneSharp /></button>
          <button onClick={markAppointmentCanceled}>Mark as Canceled <MdOutlineCancelPresentation/></button>
          <button onClick={handleEditAppointment}>Edit appointment <FaExchangeAlt /></button>
          </div>
        )}
      </Modal>
      <ToastContainer />

      {editAppointment && selectedEvent && <EditAppointment onClose={closeEditAppointmentModal} Events={events} selectedEvent={selectedEvent} onUpdateEvent={handleUpdateEvent} />}
    </div>
  );
};

export default Schedule;
