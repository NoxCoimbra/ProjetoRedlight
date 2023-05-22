import React, {useEffect, useState} from 'react'

import './ApplicantInfo.css'
import axios from "axios";


function ApplicantInfo(props) {

    return (
        <div className= "info_popup">
            <div className="info_popup_inner">
                <div className="personal_info">
                    <div>
                    <p>Name:</p>
                    <input/>
                    </div>
                    <div>
                    <p>Age:</p>
                    <input/>
                    </div>
                    <div>
                    <p>Email</p>
                    <input/>
                    </div>
                    <div>
                    <p>Phone:</p>
                    <input/>
                    </div>
                </div>
                <div className="extra_info">
                    <div class="file" id="upload_cv">
                        <input type="file" id="fileInput" onChange={chooseFile} style={{display:"none"}} />
                        <label title="Click to choose a file" for="fileInput" class="custom-button">Choose a file</label>
                        <label id="fileName" class="file-name"></label>
                    </div>
                    <select>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Under Analysis">Under Analysis</option>
                    </select>

                </div>
            </div>
        </div>
    )

}

export default ApplicantInfo;