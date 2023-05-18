import "./ApplicantsPage.css";

import React, { useState,useEffect } from "react";
import axios from "axios";

function ApplicationPage () {
    const [applicants, setApplicants] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        GetApplicants();
        GetRoles();
      }, []);
  
    

      
    const GetApplicants = async () => {
    try {
        const response = await axios.get('http://localhost:8000/applicants/list/');

        setApplicants(response.data);
     
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };
    const GetRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/applicants/list_roles');
            setRoles(response.data);
           
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        const handleDragStart = (event, applicantId) => {
            event.dataTransfer.setData('text/plain', applicantId);
          };
        
          const handleDrop = (event, roleId) => {
            event.preventDefault();
            const applicantId = event.dataTransfer.getData('text/plain');
            moveApplicant(applicantId, roleId);
          };
        
          const moveApplicant = (applicantId, roleId) => {
            console.log(roleId)
            const updatedApplicants = applicants.map((applicant) => {
              if (applicant.id === applicantId) {
                return { ...applicant, role: { id: roleId } };
              }
              return applicant;
            });
            console.log(updatedApplicants)
            console.log("oieqweqweqw")
            setApplicants(updatedApplicants);
            updateServer(applicantId, roleId);
          };
        
        const updateServer = async (applicantId, roleId) => {
            console.log(roleId)
        try {
            const formData = new FormData();
            formData.append('role_id', roleId);
            await axios.post(`http://localhost:8000/applicants/edit/${applicantId}/`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}}
            );
            console.log('Applicant updated on the server');
        } catch (error) {
            console.error('Error updating server:', error);
        }
          }; 
        
        return (

        <div className="applicants_page">
        <div className="board">
            
            {roles.map((role) => (
           
            <div
                key={role.id}
                className="column"
                onDrop={(event) => handleDrop(event, role.id)}
                onDragOver={(event) => event.preventDefault()}
            >
                <h2>{role.title}</h2>
                {applicants.map((applicant) => {
                if (applicant.role.id === role.id) {
                    return (
                    <div
                        key={applicant.id}
                        className="card"
                        draggable
                        onDragStart={(event) => handleDragStart(event, applicant.id)}
                    >
                        {applicant.name}
                    </div>
                    );
                }
                return null;
                })}
            </div>
            ))}
        </div>
        </div>
        );
    };
    
    export default ApplicationPage;