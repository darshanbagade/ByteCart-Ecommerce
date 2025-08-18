import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {userSignup} from '../../services/authServices';
import toast from "react-hot-toast";
import { Loader } from "../Loader";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate();
  
  const signup = async(data) =>{

    setIsLoading(true)
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('fullname', data.fullname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('dob', data.dob);
    formData.append('password', data.password);
  
  // Add file if selected
  if (data.avatar && data.avatar[0]) {
    formData.append('avatar', data.avatar[0]);
  }
  
    try {
      const response = await userSignup(formData)
      console.log(response)
      console.log(response.data)
      if(response.data && response.data.success){
        toast.success(response.data.message)
        navigate('/login');
      }
      setError("")
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login Failed';
      setError(errorMessage)      
    } finally {
      setIsLoading(false)
    }
  }


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };


  return (
    <div className="max-w-md my-10 mx-auto p-6 bg-white border-black border-2 rounded-2xl shadow">
      {/* Avatar Upload */}
      <h1 className="mx-auto flex justify-center my-2 p-2 font-semibold text-2xl">Create Account</h1>

      {/* Form Fields */}
      {
        isLoading ? <Loader/>  :
        <>
          <form className="space-y-4" onSubmit={handleSubmit(signup)}>
            { error && <div className="underline">{error}</div> }
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="avatar" className="cursor-pointer">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className=" text-center w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    Upload<br />&nbsp;Avatar
                  </div>
                )}
              </label>


              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                {...register("avatar" )}
                onChange={ (e) =>{
                  handleAvatarChange(e);//setting the image preview
                  register("avatar").onChange(e) //Register with React Hook Form

                }
                }
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("username",
                {
                  required:"Username is required",
                  validate:(value) => {
                    const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;

                  if( usernamePattern.test(value)){
                    return true;
                  }
                  return "Username must be at least 3 characters long and contain only letters, numbers, or underscores."
                  }

                }
              )}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("fullname",
                {
                  required: "Full Name is required"
                } 
              )}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs">{errors.fullname.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("email",
                {
                  required: "Email is required",
                  validate:(value) => {
                    const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if(emailPattern.test(value)){
                      return true;
                    }  
                    return "Please enter a valid email address (e.g., name@example.com)."
                  }
                }
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}

            <input
              type="tel"
              placeholder="Phone"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("phone",
                {
                  required: "Phone number is required",
                  validate : (value) => {
                    const phonePattern = /^[0-9]{10}$/;
                    if(phonePattern.test(value)){
                      return true;
                    }
                    return "Phone number must be exactly 10 digits without spaces or special characters"
                  }
                }
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}

            <input
              type="date"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("dob",
                {
                  required: "Date of Birth is required"
                }
              )}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs">{errors.dob.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full border-2 px-3 py-2 rounded-xl"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                },
                pattern: {
                  // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must include uppercase, lowercase, number, and special character"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-black rounded-2xl border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200 cursor-pointer "
            >
              Register
            </button>
          </form>
        </>
      }
    </div>
  );
};

export default Signup;
