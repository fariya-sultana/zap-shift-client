import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';

const LogIn = () => {

    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(res => {
                console.log(res.user)
                navigate(from);
            })
            .catch(error => console.error(error))
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
                    <p className='mt-1'><small>New to this website? <Link state={{from}} className='btn-link' to={'/register'}>Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default LogIn;