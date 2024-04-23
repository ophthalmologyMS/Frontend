import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './PatientBillingInfo.module.css';

const PatientBillingInfo = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Billing Information</h2>
              <form>
                <div className="form-group">
                  <label>Cardholder's Name:</label>
                  <input type="text" name="cardholderName" placeholder="Cardholder's Name" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input type="text" name="cardNumber" placeholder="Card Number" className="form-control" required />
                </div>
                <div className="d-flex">
                  <div className="form-group col-md-6">
                    <label>Expiry Date:</label>
                    <input type="month" name="expiryDate" className="form-control" required />
                  </div>
                  <div className="form-group col-md-6">
                    <label>CVV:</label>
                    <input type="number" name="cvv" placeholder="CVV" pattern="[0-9]{3}" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>First Name:</label>
                  <input type="text" name="firstName" placeholder='Your First Name' className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input type="text" name="lastName" placeholder='Your Last Name' className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" placeholder='example@email.com' className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Insurance:</label>
                  <input type="text" name="insurance" placeholder='Leave it if none' className="form-control" />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input type="number" name="age" placeholder='Your Age' className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select name="gender" className="form-control" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="tel" name="phone" placeholder="01xxxxxxxxx" pattern="[0-9]{11}" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBillingInfo;
