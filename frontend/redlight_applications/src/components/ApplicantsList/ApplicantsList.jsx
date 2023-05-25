import "./ApplicantsList.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import {ImBin} from "react-icons/im";

const ApplicantsList = (props) => {
    const { applicants,searchName,openInfoPopup,deleteApplicant,getStatusColor } = props;

   

    

    return (
        <div className="applicants_list">
            
            {applicants?.map((applicant) => {
                if ( applicant.name.toLowerCase().includes(searchName.toLowerCase())) {
                    return (
                    <div key={applicant.id} className="applicant_box" >
                        
                        <div className="applicant">
                            
                            <span className="text">Name: {applicant.name || ''}</span>
                            <div className="role_status">
                            <span className="text">Role: {applicant.role.title}</span>
                            <span className={`status text ${getStatusColor(applicant.status.status)}`}>{applicant.status.status}</span>
                            </div>
                        </div>
                        
                        <div className="div_items">
                            <p className="extra text" onClick={() =>openInfoPopup(applicant)}>info</p>
                            <ImBin className="icon" onClick= {()=> deleteApplicant(applicant.id)}/>
                        </div>
                        
                    </div>
                )}
                
                return null;
                })}

        </div>
    )

}

export default ApplicantsList;