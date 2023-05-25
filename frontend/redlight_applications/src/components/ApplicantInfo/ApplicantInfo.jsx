import React, {useEffect, useState} from 'react'

import './ApplicantInfo.css'
import axios from "axios"; 
import {GrClose} from "react-icons/gr";


function ApplicantInfo(props) {
    const { applicant,roles } = props;
    const [errorMessage, setErrorMessage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedApplicant, setUpdatedApplicant] = useState(applicant);
    const [avatar,setAvatar] = useState(null);
    
    useEffect(() => {
        setUpdatedApplicant(applicant);
        }, [applicant]);
        
    const editChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'status') {
            setUpdatedApplicant((prevState) => ({
            ...prevState,
            status: value ,
            }));
        } else if (name === 'role') {
            setUpdatedApplicant((prevState) => ({
            ...prevState,
            role: value,
            }));
        } else {
            setUpdatedApplicant((prevState) => ({
            ...prevState,
            [name]: value,
            }));
        }
       
    };

    const avatarChange = (event) => {
        
        const file = event.target.files[0];
        setAvatar(file);
       
      };

    const getCardColor = (status) => {
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
      



    const editSave = async () => {
        console.log(updatedApplicant)
        try {
            const formData = new FormData();

            if (typeof updatedApplicant.role === 'object') {
                formData.append('role',updatedApplicant.role.id )
            } else {
                formData.append('role',updatedApplicant.role)
            }
            if (typeof updatedApplicant.status === 'object') {
                formData.append('status',updatedApplicant.status.id)
            } else {
                formData.append('status',updatedApplicant.status)
            }
            if (updatedApplicant.name) {
                formData.append('name', updatedApplicant.name);
            }
        
            if (updatedApplicant.email) {
            formData.append('email', updatedApplicant.email);
            }
        
            if (updatedApplicant.phone) {
            formData.append('phone', updatedApplicant.phone);
            }
        
            if (updatedApplicant.age) {
            formData.append('age', updatedApplicant.age);
            }
            if (avatar) {
                console.log(avatar)
                formData.append('avatar', avatar);
              }

        
            const response = await axios.post( `http://localhost:8000/applicants/edit/${applicant.id}/`, formData);
            
    
           
            if (response.data.status === 'success') {
                setIsEditing(!isEditing);
                props.setTrigger(false);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error updating applicant:", error);
        }
    }







    return props.trigger ? (
        <div className= "info_popup">
            
                <div className="personal_info">
                    <div>
                    <p className="text">Applicant details:</p>
                    {!isEditing ? (
                    <p className="text edit" onClick={() => {setIsEditing(!isEditing); setErrorMessage(null);}}>Edit</p>
                    ) : (
                        <p className="text edit" onClick={() => {editSave(); setErrorMessage(null)}}>Save</p>
                    )}
                    </div>
                    <div>
                    <p className="text">Name: </p>
                    {isEditing ? (
                    <input
                    className="text"
                    type="text"
                    name="name"
                    defaultValue={updatedApplicant.name}
                    onChange={editChange}
                />

                    ) : (
                        <p className='text'>{applicant.name}</p>
                    )}{" "}

                    </div>
                    <div>
                    <p className="text">Avatar: </p>
                    {isEditing ? (
                   
                        <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={avatarChange}
                        />
                    ) : (
                         
                    <img src={applicant.avatar} alt="Avatar" className="avatar" />
                    
                   
                    )}
                    </div>
                    <div>
                    <p className="text">Age: </p>
                    {isEditing ? (
                    <input
                    className="text"
                    type="text"
                    name="age"
                    defaultValue={updatedApplicant.age}
                    onChange={editChange}
                />

                    ) : (
                        <p className='text'>   {applicant.age}</p>
                    )}{" "}

                    </div>
                    <div>
                    <p className="text">Email: </p>
                    {isEditing ? (
                    <input
                    className="text"
                    type="text"
                    name="email"
                    defaultValue={updatedApplicant.email}
                    onChange={editChange}
                />

                    ) : (
                        <p className='text'>   {applicant.email}</p>
                    )}{" "}

                    </div>
                    <div>
                    <p className="text">Phone: </p>
                    {isEditing ? (
                    <input
                    className="text"
                    type="text"
                    name="phone"
                    defaultValue={updatedApplicant.phone}
                    onChange={editChange}
                />

                    ) : (
                        <p className='text'>   {applicant.phone}</p>
                    )}{" "}

                    </div>
                    <div>
                    <p className="text">Role: </p>
                    {isEditing ? (
                    <select
                    className="text"
                    name="role"
                    defaultValue={updatedApplicant.role.id}
                    value={updatedApplicant.role.id}
                    onChange={editChange}
                  >
                    {roles.map((role) => (
                      <option className="text" key={role.id} value={role.id}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                    ) : (
                     <p className='text'>   {applicant.role.title}</p>
                    )}{""}
                </div>

                <p className="text" >Status:</p>
                {isEditing ? (
                <select
                className="text"
                name="status"
                defaultValue={updatedApplicant.status.id}
                value={updatedApplicant.status.id}
                onChange={editChange}
                >
                    <option className="text" value={2}>Approved</option>
                    <option className="text" value={3}>Rejected</option>
                    <option className="text" value={1}>Under Analysis</option>
                </select>
                ) : (
                   <p className={`status text ${getCardColor(applicant.status.status)}`}>{applicant.status.status}</p> 
                )}{" "}
                </div>
                {errorMessage && (<p className="text error">{errorMessage}</p>)}
                <div className="close">
                    <GrClose className="icon" onClick={()=> { props.setTrigger(false); 
                                                        setIsEditing(false);
                                                        setErrorMessage(null); }}/>
                </div>

        </div>
    ) : null

}

export default ApplicantInfo;