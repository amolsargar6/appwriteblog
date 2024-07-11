import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const{error, setError} = useState("");

  const login = async(data) => {
    // setError("")
    try {
      //checkin if the login is successful or not and session exist or not
      console.log("data" , data);
      const session = await authService.login(data.email, data.password)
      console.log('session',session);
      //if session exist means user has successfully loged in 
      if(session){

        //fetchin the current use data from the auth service
        const userData = await authService.getCurrentUser()
        console.log("userData", userData);

        //dispatch the data to login if userData exist to stoe the details of the user
        if(userData){
          dispatch(authLogin(userData))
          console.log("userData disopatched to the state");
          //is user has logged in successfully and use data is dispatched then navigate the user to root 
          navigate("/")
        }
      }
    } catch (error) {
      // setError(error.message)

      console.log("login", error.message);
    }
  }



  return (
    <div className='flex items-center justify-center w-full'>

      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>

        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width="100%" />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Sign in to your account
        </h2>

        <p className='mt-2 text-center text-base text-black/60'>
          Don't have any account?&nbsp;

          <Link
            to="/signup"
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p> 
        {/* if error exist we need to show that up on the screen */}
        { error &&
          <p className='text-red-600 mt-8 text-center'>{error}</p>
        } 
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input 
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required : true,
                validate:{
                  matchPattern : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) 
                                || "Email address must be valid address",
                }

              })}
            />

            <Input 
              label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true
              })}
            />

            <Button type="submit"  className="w-full">
              Sign in
            </Button>

          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Login;
