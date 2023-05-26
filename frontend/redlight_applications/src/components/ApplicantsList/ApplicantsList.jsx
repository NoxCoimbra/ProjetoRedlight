import "./ApplicantsList.css";
import React, { useState,useEffect } from "react";
import {ImBin} from "react-icons/im";
import { defaultAvatar } from "../../assets";

//Este componente é uma página simples onde aparece a lista dos aplicantes todos e onde é possivel filtrar por nome
// Usa a funcao de search que vem do componente "Pai"
const ApplicantsList = (props) => {
    //Props enviadas pelo componente "pai" 
    // Recebe os aplicantes, o nome a procurar, o popup de informacao, a funcao de apagar e a funcao que da a cor ao status
    const { applicants,searchName,openInfoPopup,deleteApplicant,getStatusColor } = props;

    return (
        <div className="applicants_list">
            {/**Para cada aplicante vai ser criada uma box onde é mostrada a sua informação mais relevante (nome,status,role), um botao (info) para abrir o popup de informação e um botão para apagar o aplicante*/}
            {applicants?.map((applicant) => {
                if ( applicant.name.toLowerCase().includes(searchName.toLowerCase())) {
                    return (
                    <div key={applicant.id} className="applicant_box" >
                        
                        <div className="applicant">
                            <img src={applicant.avatar || defaultAvatar} className="avatar" />
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