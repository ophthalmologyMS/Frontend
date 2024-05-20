// AddRecordModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddRecordModal.css'; // Optional: custom CSS for the modal
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root');

const AddRecordModal = ({ isOpen, onRequestClose, addRecord, patient }) => {
    const { username, type } = useParams();
    const [patientName, setPatientName] = useState(patient);
    const [RTSPH, setRTSPH] = useState('');
    const [RTCyl, setRTCyl] = useState('');
    const [RTAxis, setRTAxis] = useState('');
    const [RTReading, setRTReading] = useState('');
    const [LTSPH, setLTSPH] = useState('');
    const [LTCyl, setLTCyl] = useState('');
    const [LTAxis, setLTAxis] = useState('');
    const [LTReading, setLTReading] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [chronicDisease, setChronicDisease] = useState('');
    const [doctor, setDoctor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = {
            patientName:patient,
            record: {
                RT: {
                    SPH: RTSPH,
                    cyl: RTCyl,
                    axis: RTAxis,
                    reading: RTReading,
                },
                LT: {
                    SPH: LTSPH,
                    cyl: LTCyl,
                    axis: LTAxis,
                    reading: LTReading,
                },
                date,
                notes,
            },
            chronicDisease,
            doctor:username,
        };
        addRecord(newRecord);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Record"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Add New Record</h2>
            <form onSubmit={handleSubmit}>
                <label>Patient Name:</label>
                <input type="text" value={patient}/>
                
                <h3>Right Eye (RT)</h3>
                <label>SPH:</label>
                <input type="text" value={RTSPH} onChange={(e) => setRTSPH(e.target.value)} required />
                <label>Cyl:</label>
                <input type="text" value={RTCyl} onChange={(e) => setRTCyl(e.target.value)} required />
                <label>Axis:</label>
                <input type="text" value={RTAxis} onChange={(e) => setRTAxis(e.target.value)} required />
                <label>Reading:</label>
                <input type="text" value={RTReading} onChange={(e) => setRTReading(e.target.value)} />
                
                <h3>Left Eye (LT)</h3>
                <label>SPH:</label>
                <input type="text" value={LTSPH} onChange={(e) => setLTSPH(e.target.value)} required />
                <label>Cyl:</label>
                <input type="text" value={LTCyl} onChange={(e) => setLTCyl(e.target.value)} required />
                <label>Axis:</label>
                <input type="text" value={LTAxis} onChange={(e) => setLTAxis(e.target.value)} required />
                <label>Reading:</label>
                <input type="text" value={LTReading} onChange={(e) => setLTReading(e.target.value)} />
                
                <label>Date:</label>
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                
                <label>Notes:</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} required />
                
                <label>Chronic Disease:</label>
                <input type="text" value={chronicDisease} onChange={(e) => setChronicDisease(e.target.value)} required />
                
                <label>Doctor:</label>
                <input type="text" value={username} />
                
                <button type="submit">Add Record</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default AddRecordModal;
