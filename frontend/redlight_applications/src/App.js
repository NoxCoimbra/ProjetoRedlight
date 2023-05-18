import { RolesPage,Applicants } from './containers';
import './App.css';
import { BrowserRouter, Route,Routes, } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route className="roles_page" exact path= "/roles" element={<RolesPage/>}/>
      <Route className="applicants" exact path= "/applicants" element={<Applicants/>}/>
    </Routes>
  );
}

export default App;
