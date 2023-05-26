import React, {useEffect, useState} from 'react'
import { defaultAvatar } from '../../assets';
import './ApplicantInfo.css'
import axios from "axios"; 
import {GrClose} from "react-icons/gr";


//Este componente corresponde a um popup onde aparece a informação do aplicante selecionado.
//Aqui tambem é possivel editar a informação do aplicante ( incluindo a role e o status)

function ApplicantInfo(props) {
    //Props enviadas pelo componente "pai"
    const { applicant,roles,getStatusColor } = props;
    //Mensagem de erro caso aconteca algum erro na edicao ( email ou telemovel repetidos)
    const [errorMessage, setErrorMessage] = useState(null);
    //Estado que indica se a edicao esta ligada ou nao ( para mostrar os inputs)
    const [isEditing, setIsEditing] = useState(false);
    //Estado que guarda a informacao do aplicante editada
    const [updatedApplicant, setUpdatedApplicant] = useState(applicant);
    //Estado que guarda a imagem nova do aplicante
    const [avatar,setAvatar] = useState(null);
    
    useEffect(() => {
        //Quando o aplicante muda, o estado updatedApplicant é atualizado
        setUpdatedApplicant(applicant);
        }, [applicant]);
        
    //Funcao que muda o estado updatedApplicant quando os inputs sao alteradoS
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

    //Funcao que muda o estado avatar quando a imagem é alterada
    const avatarChange = (event) => {
        
        const file = event.target.files[0];
        setAvatar(file);
       
      };

    
    //Funcao que no caso de existir um valor entao da lhe append para o formData
    // Nesta funcao é tambem feita uma verificação para ver se a role e o status estão como objeto ou como id (no caso de ser objeto é porque não foi alterada)
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
                
                formData.append('avatar', avatar);
              }

            // Feito o post usando o axios
            const response = await axios.post( `http://localhost:8000/applicants/edit/${applicant.id}/`, formData);
            
            // No caso da resposta ser sucesso o popup é fechado e o estado é atualizado
            if (response.data.status === 'success') {
                setIsEditing(!isEditing);
                props.setTrigger(false);
            } else {
                // No caso de haver erro é mostrada a mensagem de erro (no caso do email ou do telemovel serem repetidos por exemplo)
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
                {/**No caso de estar a editar vai aparecer o botão (save) para fechar e os inputs necessários para alterar a informação */}
                {/**Caso contrario vai aparecer o botao edit e os valores atuais para as varias caracteristicas do aplicante */}
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
                        
                <img src={applicant.avatar || defaultAvatar} alt="Avatar" className="avatar" />
                
                
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
                <option className="text" value={"approved"}>Approved</option>
                <option className="text" value={"rejected"}>Rejected</option>
                <option className="text" value={"under_analysis"}>Under Analysis</option>
            </select>
            ) : (
                
                <p className={`status text ${getStatusColor(applicant.status.status)}`}>{applicant.status.status}</p> 
            )}{" "}
            {/**É usada a funcao getStatusColor para dar a cor certa ao status (vermelho-rejected/amarelo-under_analysis/verde-approved) */}
            </div>
            {/**No fim da pagina existente existe um botao para fechar o popup/desligar a edicao/resetar a mensagem de erro */}
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