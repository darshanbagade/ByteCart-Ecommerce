import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import {getCurrentUser, userLogin} from '../../services/authServices'
import { login as authLogin } from '../../store/authSlice';
import {Loader} from '../index'
import toast from 'react-hot-toast';
const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loading,setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const {register, handleSubmit} = useForm()


    const login = async(data)=>{

      setIsLoading(true)

      let payload = {password : data.password}
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{10}$/;


      if(emailPattern.test(data.identifier)){
        payload.email = data.identifier
        payload.phone =""
        payload.username =""
      }else if(phonePattern.test(data.identifier)){
        payload.phone = data.identifier
        payload.username =""
        payload.email =""
      }else{
        payload.username = data.identifier
        payload.phone =""
        payload.email =""
      }

      setError("");
      try {
        const response = await userLogin(payload);
        
        // console.log("Full response:", response);           
        // console.log("Response data:", response.data);     
        // console.log("Response session:", response.session);
        if(response.data && response.data.success){
          const currentUserResponse = await getCurrentUser();
          if(currentUserResponse.data){
            dispatch(authLogin(currentUserResponse.data));
            toast.success(response.data.message)
            navigate('/');
          }
        } 
        else{
          setError("Invalid Credentials")
        }
        
      } catch (error) {
        //Axios wraps API errors differently. When your backend sends a 401 response, axios throws an error with the response data nested inside.
        const errorMessage = error.response?.data?.message || error.message || "Login Failed";
        setError(errorMessage);
      }finally{
        setIsLoading(false)
      }
    }

  



    return (
      <div className="my-5 container bg-white min-h-screen flex items-center justify-center">
        
            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h1>
            {

            }
            
            <form className="space-y-4" onSubmit={handleSubmit(login)}>
             {
              loading ? <Loader/> :
              <>
                 {
                    error && <div className='underline'>{error}</div>
                  }
                  <div>
                    <label htmlFor='identifier' className="block text-sm font-semibold text-gray-800 mb-1">
                      Email, Phone, or Username
                    </label>
                    <input
                      id= "identifier"
                      type="text"
                      placeholder="Enter email, phone, or username"
                      className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
                      {
                        ...register(
                          "identifier",
                          {
                            required :true,
                            validate : (value) => {
                              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
                              const phonePattern = /^[0-9]{10}$/;
                              if(
                                emailPattern.test(value) ||
                                phonePattern.test(value) ||
                                usernamePattern.test(value)
                              ){
                                return true;
                              }
                              return "Must be avalid email, phone, or username"

                            }
                          }
                        )
                      }
                    
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className="block text-sm font-semibold text-gray-800 mb-1">
                      Password
                    </label>
                    <input
                      id='password'
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
                      {...register("password",
                        {required : true}
                      )
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200 cursor-pointer"
                  >
                    Login
                  </button>
              </>
             }
             
             
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-black underline hover:decoration-double">
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              <Link to="/forgot-password" className="text-black underline hover:decoration-double">
                Forgot Password?
              </Link>
            </p>
          </div>
        
      </div>
    );
};

export default Login;