import './App.css';
import {ImArrowUpRight2} from 'react-icons/im';
import {MdWorkspaces} from 'react-icons/md';
import {AiFillSetting} from 'react-icons/ai';
import Dashboard from './Dashboard';

import { useState } from 'react';
function App() {
  const [val,setval] = useState(1);
  const handleclick=()=>{
      setval(2);
      console.log(val);
  }
  return (
    <div className="App">
      <div className='divider'>
          <div className='left'>
             <img className='img' src={require('./WhatsApp Image 2023-07-19 at 9.59.43 AM.jpeg')}/>
             <div style={{marginTop:'10px'}} className='navbartag1'>
             <ImArrowUpRight2 style={{marginTop:'18px',fontWeight:'900',fontSize:'18px'}}/>
              <p style={{fontSize:'17px'}}>Reports</p>
             </div>
             <div onClick={handleclick} className={`navbartag${val}`}>
             <MdWorkspaces className={`workspacestyle${val}`}  />
             <p  style={{fontSize:'17px'}}>Workspace</p>
             </div>
             <div className='navbartag1'>
             <AiFillSetting style={{marginTop:'18px',fontWeight:'900',fontSize:'18px'}}/>
             <p style={{fontSize:'17px'}}>Settings</p>
            </div>
          </div>
          <div className='right'>
            <Dashboard/>
          </div>
      </div>
    </div>
  );
}

export default App;
