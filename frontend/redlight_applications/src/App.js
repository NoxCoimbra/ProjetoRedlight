import { RolesPage,Applicants } from './containers';
import './App.css';
import { BrowserRouter, Route,Routes, } from 'react-router-dom';

function App() {
  return (
    <Routes>
    
      <Route className="applicants" exact path= "/" element={<Applicants/>}/>
    </Routes>
  );
}

export default App;
