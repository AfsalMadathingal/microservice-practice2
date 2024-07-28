import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async data => {
    
    const {email, password} = data;

    try {
      const res = await axios.post('http://localhost:9000/api/signup/user', {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.success) {
        navigate('/login');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);

    }
  };

  return (
    <form
      className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Join Us!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Create your account to get started.
        </p>
        <div className="mt-10">
          <div className="relative">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="email"
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>

          <div className="mt-10">
            <button
              className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
        <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
          Already have an account?
          <a className="font-medium underline" onClick={() => navigate('/login')}>Login</a>
        </div>
      </div>
    </form>
  );
};

export default Signup;
