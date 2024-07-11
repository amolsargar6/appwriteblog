import React, {useState} from 'react';
import autheService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';


function Signup() {

    const {register, handleSubmit} = useForm(); //to handle the form actions and submits
    const {error, setError} = useState(""); //to handle the error array state and at the end display the errors
    const navigate = useNavigate(); //to handle the navigation of the form after submiting the form
    const dispatch = useDispatch(); //to handle the user data, dispatch it into the db and front end fields

    console.log("inside signup");

    const signup = async(data) => {
        console.log('reached in sgnup');
        // setError("")

        try {
            console.log("getting session details");
            const session = await autheService.createAccount(data)
            console.log(session);

            if(session){
                console.log('getting curent user');
                // const userData = await autheService.getCurrentUser();

                if(userData) {
                    dispatch(login(userData))
                }
                navigate("/")
            } 



        } catch (error) {
            // setError(error.message);
            console.log(error.message);
            console.log('catch signup error');
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px'>
                    <Logo width="100%" />
                </span> 
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account
            </h2>

            <p className='mt-2 text-center text-base text-black/60'>
            already have an account?&nbsp;

            <Link
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
            </p>
            {error && 
                <p className='text-red-600 mt-8 text-center'>{error}</p>
            } 

            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    {/* name field for signup form*/}
                    <Input 
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required:true
                        })}
                    />

                    {/* email field for signup form */}
                    <Input 
                        lable="Email"
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

                    {/* password field for signup form */}
                    <Input 
                        label="Passowrd"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true
                        })}

                    />

                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    
    </div>
  );
}

export default Signup;
