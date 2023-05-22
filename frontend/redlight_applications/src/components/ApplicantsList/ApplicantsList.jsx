import "./ApplicantsList.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import {ImBin} from "react-icons/im";

function ApplicantsList(props) {
    const [applicants, setApplicants] = useState([]);

    return (
        <div className="applicants_list">
            
            {applicants?.map(applicant => (
                    <div key={applicant.id} className="applicant_box" >
                        
                        <div className="text">
                            <p>ID: {applicant.id}</p>
                            <p>Name: {applicant.name || ''}</p>
                        </div>
                        
                        <div className="div_items">
                            <p title="delete applicant" ><ImBin/></p>
                        </div>
                        
                    </div>
                ))}

        </div>
    )

}

export default ApplicantsList;