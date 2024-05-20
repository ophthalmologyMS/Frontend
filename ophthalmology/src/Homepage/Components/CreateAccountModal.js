import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateAccountModal.css'; // Add your custom CSS for styling the modal

const CreateAccountModal = ({ isOpen, onRequestClose }) => {
    const [accountType, setAccountType] = useState('patient');
    const [patientData, setPatientData] = useState({
        username: '',
        patientName: '',
        password: '',
        gender: '',
        phone: '',
        email: '',
        DOB: '',
        insurance: '',
        ChronicDisease: ''
    });
    const [doctorData, setDoctorData] = useState({
        username: '',
        doctorName: '',
        password: '',
        gender: '',
        phone: '',
        email: '',
        fees: '',
        Speciality: ''
    });
    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'patient') {
            setPatientData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else if (type === 'doctor') {
            setDoctorData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setAdminData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (accountType === 'patient') {
                await axios.post('http://localhost:8000/api/patientSignUp', patientData);
            } else if (accountType === 'doctor') {
                await axios.post('http://localhost:8000/api/doctorSignUp', doctorData);
            } else {
                await axios.post('http://localhost:8000/api/adminSignUp', adminData);
            }
            toast.success('Account created successfully!');
            
            onRequestClose();
        } catch (error) {
            console.error('Error creating account:', error);
            toast.success('Account Created');
        }
        
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Account"
            className="Modal mt-5"
        >
            <h2>Create {accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Account Type:
                    <select name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <br />
                {accountType === 'patient' && (
                    <>
                        <label>
                            Username:
                            <input type="text" name="username" value={patientData.username} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" value={patientData.password} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Gender:
                            <input type="text" name="gender" value={patientData.gender} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Phone:
                            <input type="text" name="phone" value={patientData.phone} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" value={patientData.email} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Patient Name:
                            <input type="text" name="patientName" value={patientData.patientName} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Date of Birth:
                            <input type="date" name="DOB" value={patientData.DOB} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Insurance:
                            <input type="text" name="insurance" value={patientData.insurance} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                        <label>
                            Chronic Disease:
                            <input type="text" name="ChronicDisease" value={patientData.ChronicDisease} onChange={(e) => handleChange(e, 'patient')} required />
                        </label>
                        <br />
                    </>
                )}
                {accountType === 'doctor' && (
                    <>
                        <label>
                            Username:
                            <input type="text" name="username" value={doctorData.username} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" value={doctorData.password} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Gender:
                            <input type="text" name="gender" value={doctorData.gender} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Phone:
                            <input type="text" name="phone" value={doctorData.phone} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" value={doctorData.email} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Doctor Name:
                            <input type="text" name="doctorName" value={doctorData.doctorName} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Fees:
                            <input type="number" name="fees" value={doctorData.fees} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                        <label>
                            Speciality:
                            <input type="text" name="Speciality" value={doctorData.Speciality} onChange={(e) => handleChange(e, 'doctor')} required />
                        </label>
                        <br />
                    </>
                )}
                {accountType === 'admin' && (
                    <>
                        <label>
                            Username:
                            <input type="text" name="username" value={adminData.username} onChange={(e) => handleChange(e, 'admin')} required />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" value={adminData.email} onChange={(e) => handleChange(e, 'admin')} required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" value={adminData.password} onChange={(e) => handleChange(e, 'admin')} required />
                        </label>
                        <br />
                    </>
                )}
                <button type="submit">Create Account</button>
            </form>
        </Modal>
    );
};

export default CreateAccountModal;
