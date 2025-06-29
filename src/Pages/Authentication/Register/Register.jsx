import React from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {

    const { createUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error.message);
            })
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
                            {...register('text', { required: true })}
                            className="input" placeholder="Name" />
                        {
                            errors.text?.type === 'required' && <p className="text-red-500">Name is required</p>
                        }

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