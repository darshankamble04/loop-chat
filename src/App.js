import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import './utils.css'
import DataContext from './context/DataContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Login from './components/Auth/Login';

function App() {
  const { MY_USERID, setMY_USERID } = useContext(DataContext)
  // setMY_USERID(prompt())
  setMY_USERID(window.localStorage.getItem("Chat-loop-Id"))
  useEffect(() => {
    // console.log(prompt())

  }, [])
  
  return (
    <div className='d-vcenter'>
        {!MY_USERID ? <Login /> : <Dashboard /> }
    </div>
  );
}

export default App;
