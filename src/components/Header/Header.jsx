import React from 'react';
import {Container, Logo, LogoutBtn} from '../index'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  
  //to check the status of the user loged in or loged out
  const authStatus = useSelector((state) => state.status)
  //for navigations, navigation bar
  const navigate = useNavigate();
  //navigation array for navigation bar
  const navItems = [
    {
      name: 'Home',
      slug: "/",          //slug is URL path 
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-post",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]

  return (
    
      <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <logo />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {
              navItems.map((item) => 
              item.active ?  (
                <li key={item.name}>
                  <button 
                      onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '>
                    {item.name}
                  </button>
                </li>
              ) : null
              )
            }

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          
        </nav>
      </Container>
      </header>
    
  )
}

export default Header;
