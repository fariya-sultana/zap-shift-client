import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../Hooks/useAxios';

const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const axiosInstance = useAxios();

    const [profilePic, setProfilePic] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                const userInfo = {
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_lof_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log('main data', userRes.data);

                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile pic Updated')
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_PROFILE_KEY}`

        const res = await axios.post(imageUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Create an Account</h1>
                <p className='text-xl ml-1 font-medium'>Register with Profast</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Name" />
                        {
                            errors.text?.type === 'required' && <p className="text-red-500">Name is required</p>
                        }

                        <label className="label">Your Profile</label>
                        <input
                            type="file"
                            className="input"
                            onChange={handleImageUpload}
                            placeholder="Your Profile Profile" />

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className="text-red-500">Password must be at least 6 characters or longer</p>
                        }

                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p className='mt-1'><small>Already have an account? <Link className='btn-link' to={'/login'}>Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Register;