import React, {useEffect, useState} from 'react'

import './ApplicantInfo.css'
import axios from "axios"; 
import {GrClose} from "react-icons/gr";


function ApplicantInfo(props) {
    const { applicant } = props;
    const [isEditing, setIsEditing] = useState(false);
   

    return props.trigger ? (
        <div className= "info_popup">
            
                <div className="personal_info">
                    <div>
                    <p>Applicant details:</p>
                    {!isEditing ? (
                    <p className="edit" onClick={() => setIsEditing(!isEditing)}>Edit</p>
                    ) : (
                        <p className="edit" onClick={() => setIsEditing(!isEditing)}>Save</p>
                    )}
                    </div>
                    <div>
                    <p>Name: </p>
                    {isEditing ? (
                    <input
                    type="text"
                    name="name"
                    defaultValue={applicant.name}
                />

                    ) : (
                        applicant.name
                    )}{" "}

                    </div>
                    <div>
                    <p>Age: </p>
                    {isEditing ? (
                    <input
                    type="text"
                    name="age"
                    defaultValue={applicant.age}
                />

                    ) : (
                        applicant.age
                    )}{" "}

                    </div>
                    <div>
                    <p>Email: </p>
                    {isEditing ? (
                    <input
                    type="text"
                    name="email"
                    defaultValue={applicant.email}
                />

                    ) : (
                        applicant.email
                    )}{" "}

                    </div>
                    <div>
                    <p>Phone: </p>
                    {isEditing ? (
                    <input
                    type="text"
                    name="phone"
                    defaultValue={applicant.phone}
                />

                    ) : (
                        applicant.phone
                    )}{" "}

                    </div>
                    <div>
                    <p>Role: </p>
                    {isEditing ? (
                    <input
                    type="text"
                    name="role"
                    defaultValue={applicant.role}
                />
                    ) : (
                        applicant.role.title
                    )}{""}
                </div>

                <p>Status:</p>
                {isEditing ? (
                <select>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Under Analysis">Under Analysis</option>
                </select>
                ) : (
                    applicant.status.status
                )}{" "}
                </div>
                <div className="close">
                    <GrClose/>
                </div>

        </div>
    ) : null

}

export default ApplicantInfo;