import "./ApplicantsPage.css";

import React, { useState,useEffect } from "react";
import axios from "axios";

import { Popup,ApplicantInfo,ApplicantsList } from "../../components";
import  {GrAdd} from "react-icons/gr";
import {RiDeleteBin6Line} from "react-icons/ri";

// Este container é a pagina principal da app onde os outros componentes são renderizados
function ApplicationPage() {
  //Estado que guarda os aplicantes
  const [applicants, setApplicants] = useState([]);
  //Estado que guarda as roles
  const [roles, setRoles] = useState([]);
  //estado para ver se o applicantPopup esta aberto ou nao
  const [applicantPopup, setApplicantPopup] = useState(false);
  //Estado para guardar uma role para usar no applicantPopup
  const [roleID, setActiveRole] = useState(null);
  //Estado para indicar que pagina é que tem que ser renderizada ( começa sempre na board page  ( true - board page, false - list page)) 
  const [selectedOption, setSelectedOption] = useState(true);
  //Estado para guardar o nome do aplicante que esta a ser pesquisado
  const [searchName, setSearchName] = useState("");
  //Estado para controlar se o popup da role esta aberto ou não
  const [rolePopup, setRolePopup] = useState(false);
  //Estado para controlar se o popup da informação do aplicante esta aberto ou não
  const [infoPopup, setInfoPopup] = useState(false);
  //Estado para guardar o aplicante selecionado e usar no applicantInfo
  const [selectedApplicant, setSelectedApplicant] = useState(null);

 
  //Em caso de pesquisa por nome o estado searchName é atualizado
  const searchEvent = (event) => {
    const value = event.target.value;
    
    if (value !== "name") {
      // Clear the search query when changing the filter option
      setSearchName("");
    }
  };

  //Funcao que abre o applicantPopup e guarda a roleID
  const createApplicant = (roleID) => {
    setActiveRole(roleID);
    setApplicantPopup(true);
  };
  //Funcao que abre o rolePopup
  const createRole = () => {
    setRolePopup(true);
  };
  //Funcao que abre o infoPopup e guarda o aplicante selecionado
  const openInfoPopup = (applicant) => {
    setInfoPopup(true);
    setSelectedApplicant(applicant);
  }
 
  //Funcao para mudar de pagina
  const changePage = () => {
    setSelectedOption(!selectedOption);
    
  }
  //O use effect vai buscar os aplicantes e as roles
    useEffect(() => {
      getRoles();
      getApplicants();
    }, []);
  
    //Funcao para ir buscar os aplicantes
    const getApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicants/list/');
        setApplicants(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  //Funcao para ir buscar as roles
    const getRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicants/list_roles/');
        
        setRoles(response.data);
        
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    //Funcao para arrastar o card de um aplicante
    const handleDragStart = (event, applicantId) => {
      event.dataTransfer.setData('text/plain', applicantId);
    };
    
    //Funcao para largar o card de um aplicante e consequentemente atualizar a role do aplicante ( no caso de este ser arrastado para outra role)
    const handleDrop = (event, roleId) => {
      event.preventDefault();
      const applicantId = event.dataTransfer.getData('text/plain');
      moveApplicant(applicantId, roleId);
    };

    //Funcao que atualiza a role de um aplicante ( no caso de este ser arrastado para outra role)
    const moveApplicant = async (applicantId, roleId) => {
      try {
        const formData = new FormData();
        formData.append('role', roleId);
        await axios.post(`http://localhost:8000/applicants/edit/${applicantId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        //Atualizacao automatica da pagina
        getApplicants();

        } catch (error) {
        console.error(error);
        }
    };

    //Funcao para apagar um aplicante
    const deleteApplicant = async (applicantId) => {
      try {
        await axios.request({
         url: `http://localhost:8000/applicants/delete/${applicantId}/`, 
    
        });
        //Atualizacao automatica da pagina
        getApplicants();
      } catch (error) {
        console.error(error);
      }
    }
    //Funcao para apagar uma role
    const deleteRole = async (roleId) => {
      try {
        console.log("oi")
        await axios.delete(`http://localhost:8000/applicants/delete_role/${roleId}/`);
        //Atualizacao automatica da pagina
        getRoles();
        getApplicants();
      } catch (error) {
        console.error(error);
      }
    };

    //Funcao para obter a cor do status de um aplicante  (verde-approved/vermelho-rejected/amarelo-under_analysis)
    const getStatusColor = (status) => {
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
            {/**Navbar do site com barra de pesquisa/botao de criacao de novas roles e botao para mudar de pagina */}
            <div className="bar_content">
              <div className="bar_content_filters">
                <span className="small_header">Search:</span>
                <input
                  className="small_header"
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(event) => setSearchName(event.target.value)}
                 
                />
            </div>
            <div className="bar_content_icons">
              {/**Popup para criar uma nova role Quando é fechado atualiza automaticamente as roles da pagina*/}
            <Popup
                trigger={rolePopup}
                setTrigger={(value) => {
                  setRolePopup(value);
                  if (!value) {
                    getRoles();
                  }
                }}
                createType="role"
              />
              {/**Botao para criar uma nova role e botao para mudar de pagina ( list ou board) */}
              <button className="small_header" onClick={() => createRole()}>Create new role</button>
              {selectedOption === true ? (
              <button className="small_header"onClick= {changePage}>list</button>
              ) : (
                <button className="small_header"onClick= {changePage}>board</button>
              )}
            </div>
          </div>

          </div>
         {/**Renderizacao da pagina correca de acordo com o useState selectedOption */}
         {selectedOption === true ? (
          <div className="board">
            {/**Renderizacao das boards para cada role */}
            {roles.map((role) => (
              <div
                key={role.id}
                className="column"
                onDrop={(event) => handleDrop(event, role.id)}
                onDragOver={(event) => event.preventDefault()}
              >
                
                <div className="column_title">
                  <div>
                  <h2 className="header">{role.title}</h2>
                  </div>
                  <div >
                    {/**Cada board tem um botao para adicionar aplicantes ( a essa role ) e um botao de delete da role*/}
                  <GrAdd
                      className="icon"
                      onClick={() => createApplicant(role.id)}
                    />
                  <RiDeleteBin6Line title="delete role" className="icon"onClick={() => deleteRole(role.id)}/>
                  
                </div>
                
                </div>
                {/**Popup para criar um aplicante*/}
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
                {/**Renderizacao dos aplicantes de cada role em forma de cards  Cada card tem o nome e o estado do applicant ( com a devida cor) 
                 * e um botao para apagar o aplicante */}
                  <div className="applicants">
                    {applicants.map((applicant) => {
                      {/** Filtro para verificar se o aplicante condiz com o nome pesquisado */}
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
                            <p className="text">Name: {applicant.name}</p>
                            
                            <div className="icons">
                               <span className={`status text ${getStatusColor(applicant.status.status)}`}>{applicant.status.status}</span>
                               <RiDeleteBin6Line className="icon" onClick={() => deleteApplicant(applicant.id)}/>
                            </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                
              </div>
            ))}
          {/**Renderizacao da pagina com a lista de aplicantes */}            
          </div>
         ) : (
          <ApplicantsList
            applicants= {applicants}
            searchName={searchName}
            openInfoPopup={openInfoPopup}
            deleteApplicant={deleteApplicant}
            getStatusColor={getStatusColor}
            createApplicant={createApplicant}
          />) 
          }
          </div>
          {/**Renderizacao do Popup para mostrar a informacao de um aplicante */}
          <ApplicantInfo
          trigger={infoPopup}
          setTrigger={(value) => {
            setInfoPopup(value);
            if (!value) {
              getApplicants();
            }  
          }}
          applicant={selectedApplicant}
          roles={roles}  
          getStatusColor={getStatusColor}   
        />
         
          </div>
    
                  
    );
      
  }
  
  
  
    
    export default ApplicationPage;