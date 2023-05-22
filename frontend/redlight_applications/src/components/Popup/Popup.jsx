import React, {useEffect, useState} from 'react'
import './Popup.css'
import axios from "axios";


function Popup(props) {
    const [name, setName] = useState("");
    const { roleId, createType } = props;
    
    const saveData = async () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role_id', roleId);
      
      try {
        if (createType === 'applicant') {
          await axios.post(`http://localhost:8000/applicants/add/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else if (createType === 'role') {
          await axios.post(`http://localhost:8000/applicants/add_role/`, formData,{
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      props.setTrigger(false);
    };
  
    return props.trigger ? (
      <div className="popup">
        <div className='applicant_info'>
          <p>{createType === 'applicant' ? 'Applicant Name' : 'Role Title'}</p>
          <input
            type="text"
            placeholder={createType === 'applicant' ? 'Applicant name' : 'Role title'}
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="buttons">
            <button className="btn" onClick={saveData}>Save</button>
            <button className="btn" onClick={() => props.setTrigger(false)}>Cancel</button>
          </div>
        </div>
      </div>
    ) : null;
  }
  

  export default Popup;