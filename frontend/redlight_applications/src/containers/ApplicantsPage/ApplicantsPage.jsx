import "./ApplicantsPage.css";

import React, { useState,useEffect } from "react";
import axios from "axios";

function ApplicationPage() {
    const [applicants, setApplicants] = useState([]);
    const [roles, setRoles] = useState([]);
  
    useEffect(() => {
      getApplicants();
      getRoles();
    }, []);
  
    const getApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicants/list/');
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const getRoles = async () => {
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
  
    const moveApplicant = async (applicantId, roleId) => {
      try {
        const formData = new FormData();
        formData.append('role_id', roleId);
        await axios.post(`http://localhost:8000/applicants/edit/${applicantId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        getApplicants();

        } catch (error) {
        console.error(error);
        }
    };
        return (

        <div className="applicants_page">
            <div className="side_bar">
                <h1>Aplicants Page</h1>
            </div>
            <div className="applicants_info">
            <div className="search_bar">

            </div>
        <div className="board">
            
            {roles.map((role) => (
           
            <div
                key={role.id}
                className="column"
                onDrop={(event) => handleDrop(event, role.id)}
                onDragOver={(event) => event.preventDefault()}
            >
                <h2>{role.title}</h2>
                <div className="applicants">
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
            </div>
            ))}
        </div>
        </div>
        </div>
        );
    };
    
    export default ApplicationPage;