// BillsModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const BillsModal = ({ isOpen, onRequestClose, username }) => {
  const [bills, setBills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getBills/${username}`);
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchBills();
    }
  }, [isOpen, username]);

  if (loading) {
    return <></>;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Past Bills</h2>
      {bills ? (
        <div>
          <p>Bill ID: {bills._id}</p>
          <p>Patient Name: {bills.patientName}</p>
          <p>Doctor Name: {bills.doctorName}</p>
          <p>Bill Amount: ${bills.billAmount}</p>
          <p>Insurance Coverage: ${bills.insuranceCoverage}</p>
          <p>Bill Insured: ${bills.billInsured}</p>
          <p>Service: {bills.service}</p>
          <p>Admin Name: {bills.adminName}</p>
          <p>Created At: {new Date(bills.createdAt).toLocaleString()}</p>
          <p>Is Paid: {bills.isPaid ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No bills found.</p>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default BillsModal;
