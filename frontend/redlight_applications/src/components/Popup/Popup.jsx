import React, {useEffect, useState} from 'react'
import './Popup.css'
import axios from "axios";

// Este componente  corresponde ao popup de criação tanto de roles como aplicantes
function Popup(props) {
    const [name, setName] = useState("");
    // Nas props recebe o id da role ( no caso de ser um aplicante ) e o tipo de criação ( role ou applicant)
    const { roleId, createType } = props;
    
    //Esta funcao envia para o backend a informacao do aplicante ou da role (consoante o tipo de criacao que foi passado nas props)
    const saveData = async () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role_id', roleId);
      console.log(formData)
      console.log(roleId)
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
      //no fim de enviar a informacao para o backend, o popup é fechado
      props.setTrigger(false);
    };
  
    return props.trigger ? (
      <div className="popup">
        <div className='applicant_info'>
          <p className="text">{createType === 'applicant' ? 'Applicant Name' : 'Role Title'}</p>
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