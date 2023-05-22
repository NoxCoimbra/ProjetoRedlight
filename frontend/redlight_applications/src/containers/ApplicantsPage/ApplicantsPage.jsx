import "./ApplicantsPage.css";

import React, { useState,useEffect } from "react";
import axios from "axios";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {BsThreeDotsVertical} from "react-icons/bs";
import { Popup,ApplicantInfo } from "../../components";
import  {GrAdd} from "react-icons/gr";
import {RiDeleteBin6Line} from "react-icons/ri";

function ApplicationPage() {
  const [applicants, setApplicants] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showApplicants, setShowApplicants] = useState({});
  const [applicantPopup, setApplicantPopup] = useState(false);
  const [roleID, setActiveRole] = useState(null);
  const [selectedOption, setSelectedOption] = useState("role");
  const [searchName, setSearchName] = useState("");
  const [rolePopup, setRolePopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

 

  const searchEvent = (event) => {
    const value = event.target.value;
    
    if (value !== "name") {
      // Clear the search query when changing the filter option
      setSearchName("");
    }
  };

  const createApplicant = (roleID) => {
    setActiveRole(roleID);
    setApplicantPopup(true);
  };
  const createRole = () => {
    
    setRolePopup(true);
  };

  const openInfoPopup = (applicant) => {
    setInfoPopup(true);
    setSelectedApplicant(applicant);
  }
 

  const handleOption = (e) => {
    setSelectedOption(e.target.value);

  }

    useEffect(() => {
      getRoles();
      getApplicants();
    }, []);
  
    const getApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicants/list/');
        setApplicants(response.data);
    
        const initialShowApplicants = response.data.reduce((acc, applicant) => {
          const roleId = applicant.role.id;
          if (!acc[roleId]) {
            acc[roleId] = true;
          }
          return acc;
        }, {});
        setShowApplicants(initialShowApplicants);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const getRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicants/list_roles/');
        
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

    const deleteApplicant = async (applicantId) => {
      try {
        await axios.request({
         url: `http://localhost:8000/applicants/delete/${applicantId}/`, 
    
        });
        getApplicants();
      } catch (error) {
        console.error(error);
      }
    }

    const getCardColor = (status) => {
      console.log(status)
      switch (status) {
        case 'rejected':
          return 'rejected';
        case 'approved':
          return 'approved';
        case 'under_analysis':
          return 'under-analysis';
        default:
          return '';
      }
    };
    
    
    return (
      <div className="applicants_page">
     
        <div className="applicants_info" >
          <div className="filter_bar">
            <div className="bar_content">
              <div className="bar_content_filters">
            <span>Search:</span>
              
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(event) => setSearchName(event.target.value)}
                 
                />
            </div>
            <div className="bar_content_icons">
            <Popup
                trigger={rolePopup}
                setTrigger={(value) => {
                  setRolePopup(value);
                  if (!value) {
                    getApplicants();
                  }
                }}
                createType="role"
              />
              <button onClick={() => createRole()}>Create new role</button>  
              <button>See applicants list</button>
            </div>
          </div>

          </div>
         
         {selectedOption === "role" && (
          <div className="board">
            
            {roles.map((role) => (
              <div
                key={role.id}
                className="column"
                onDrop={(event) => handleDrop(event, role.id)}
                onDragOver={(event) => event.preventDefault()}
              >
                
                <div className="column_title">
                  <div>
                  <h2>{role.title}</h2>
                  </div>
                  <div >
                  <GrAdd
                      className="icon"
                      onClick={() => createApplicant(role.id)}
                    />
                  
                </div>
                
                </div>
                <Popup
                  trigger={role.id === roleID ? applicantPopup : false}
                  setTrigger={(value) => {
                    setApplicantPopup(value);
                    if (!value) {
                      getApplicants();
                    }
                  }}
                  roleId={role.id}
                  createType="applicant"
                />
                {showApplicants[role.id] && (
                  <div className="applicants">
                    {applicants.map((applicant) => {
                      if (applicant.role.id === role.id && applicant.name.toLowerCase().includes(searchName.toLowerCase())) {
                        return (
                          <div
                            key={applicant.id}
                            className="card"
                            draggable
                            onDragStart={(event) => handleDragStart(event, applicant.id)}
                            onClick={() => openInfoPopup(applicant)}
                          >
                            <div className="card_content">
                            <p>Name: {applicant.name}</p>
                            
                            <div className="icons">
                               <span className={`status ${getCardColor(applicant.status.status)}`}>{applicant.status.status}</span>
                               <RiDeleteBin6Line onClick={() => deleteApplicant(applicant.id)}/>
                            </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
         ) }
          </div>
          <ApplicantInfo
          trigger={infoPopup}
          setTrigger={(value) => {
            setInfoPopup(value);
            if (!value) {
              getApplicants();
            }  
          }}
          applicant={selectedApplicant}
      
          
        
        />
         
          </div>
    
                  
    );
      
  }
  
  
  
    
    export default ApplicationPage;