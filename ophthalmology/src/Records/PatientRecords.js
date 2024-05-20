import React, { useState, useEffect } from 'react';
import classes from './PatientRecords.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from '../Homepage/Components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecordCard from './Components/RecordCard';
import { useParams } from 'react-router-dom';
import AddRecordModal from './Components/AddRecordModal'; // Import the modal component

export default function PatientRecords() {
    const { username, type } = useParams();
    const [patientList, setPatientList] = useState([]);
    const [Records, setRecords] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    async function getRecordsPatient() {
        const promise = await axios.get(`http://localhost:8000/api/patientInfo/${username}`);
        return promise.data;
    }

    async function getRecordsStaff(name) {
        if (name === '' || name === 'Select a patient' || name === null) {
            return;
        }
        const promise = await axios.get(`http://localhost:8000/api/patientInfo/${name}`);
        return promise.data;
    }

    async function getAllPatients() {
        const promise = await axios.get(`http://localhost:8000/api/allPatients`);
        return promise.data;
    }

    useEffect(() => {
        async function FetchRecords() {
            if (type === 'doctor' || type === 'admin') {
                const patients = await getAllPatients();
                if (patients) {
                    setPatientList(patients.patients);
                }
            } else {
                const data = await getRecordsPatient();
                if (data) {
                    setRecords(data.patient.record);
                }
            }
        }

        FetchRecords();
    }, [type, username]);

    async function FetchRecords(name) {
        const data = await getRecordsStaff(name);
        if (data) {
            setRecords(data.patient.record);
        }
    }

    const handlePatientSelect = (event) => {
        setSelectedPatient(event.target.value);
        FetchRecords(event.target.value);
    };

    const addRecord = async (newRecord) => {
        try{
            const promise = await axios.post(`http://localhost:8000/api/doctorEditPatientProfile`,newRecord)
            toast.success("Record Added")
            console.log(newRecord)
            FetchRecords(newRecord.patientName)
            return promise.data
        } catch (error) {
            console.log(newRecord)
            console.error("Error fetching available times:", error);
            return [];
          }
    };

    return (
        <>
            <NavBar />
            <div className={`container `}>
                <label htmlFor="patientDropdown">Select a patient:</label>
                <select
                    id="patientDropdown"
                    value={selectedPatient}
                    onChange={handlePatientSelect}
                    className={classes.smallerDropdown}
                >
                    <option value="">{type === 'patient' ? username : 'Select a patient'}</option>
                    {patientList.map((patient) => (
                        <option key={patient} value={patient}>
                            {patient}
                        </option>
                    ))}
                </select>
                {type === 'doctor' && (
                    <button onClick={() => setIsModalOpen(true)} className={classes.addButton}>
                        Add Record
                    </button>
                )}
            </div>

            {Records.map((item) => (
                <RecordCard key={item.id} type={type} record={item} />
            ))}

            <AddRecordModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                addRecord={addRecord}
                patient={selectedPatient}
            />
        </>
    );
}
