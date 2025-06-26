import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const LogIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (


        <div className="card bg-base-100 w-full max-w-sm shrink-0">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Welcome Back</h1>
                <p className='text-xl ml-1 font-medium'>Login with Profast</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email')} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true
                                ,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className="text-red-500">Password must be at least 6 characters or longer</p>
                        }
                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p className='mt-1'><small>New to this website? <Link className='btn-link' to={'/register'}>Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default LogIn;