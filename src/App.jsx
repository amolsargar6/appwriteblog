import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components';
import {Outlet} from 'react-router-dom';

function App() {

  //we are using loading state as we need time to take the data from server, and it might take some time for this we need loading state
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {

    authService.getCurrentUser()
    .then((userData) => {

      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }

    })
    .finally(() => setLoading(false))
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
  
  // if(!loading){
  //   return 
  //   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  //     <div className='w-full block'>
  //       <Header />
  //       <main>
  //         {/* <Outlet /> */}
  //       </main>
  //       <Footer />
  //     </div>
  //   </div>
  // } else {
  //   return null
  // }
}

export default App
