import React from "react";
import classes from './PatientRecords.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBar from "../Homepage/Components/Navbar";
import axios from "axios"
import RecordCard from "./Components/RecordCard";

export default function PatientRecords(){
    const [Records, setRecords] = React.useState([])

    async function getRecords(){
        const promise = await axios.get(`http://localhost:8000/api/patientInfo/khaled`)
        return promise.data
    }

    React.useEffect(()=>{
        async function FetchRecords(){
            const data = await getRecords()
            if(data){
                setRecords(data.patient.record)
                
            } 
        }

        FetchRecords()
    },[])

    return(
        <>
            <NavBar></NavBar>
            {
                Records.map((item)=>(
                    <RecordCard record={item} />
                ))
            }
        </>
    )
}