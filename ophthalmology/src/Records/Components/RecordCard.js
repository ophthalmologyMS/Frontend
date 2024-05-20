import React from "react";
import classes from '../PatientRecords.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function RecordCard({ key, type, record }) {
    const [rightEye, setRightEye] = React.useState();

    function formatDateToText(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        return `the ${day}th of ${month}`;
    }

    React.useEffect(() => {
        function setEyes() {
            setRightEye(record.SPH); // Assuming RT contains only one object
        }

        setEyes();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <table className="">
                    <thead>
                        <tr>
                            <th>Eye</th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>Axis</th>
                            <th>Reading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Right Eye (RT)</td>
                            <td>{record.RT.SPH}</td>
                            <td>{record.RT.cyl}</td>
                            <td>{record.RT.axis}</td>
                            <td>{record.RT.reading}</td>
                        </tr>
                        <tr>
                            <td>Left Eye (LT)</td>
                            <td>{record.LT.SPH}</td>
                            <td>{record.LT.cyl}</td>
                            <td>{record.LT.axis}</td>
                            <td>{record.LT.reading}</td>
                        </tr>
                    </tbody>
                </table>
                
                <p className="mt-2">Notes: {record.notes} conducted by Dr. {record.doctor} on {formatDateToText(record.date)}.</p>
                
            </div>
            <hr />
        </div>
    );
}
