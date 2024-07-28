import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async data => {
    
    const { email, password } = data;

    const res = await axios.post('http://localhost:9000/api/login/user', {
      email,
      password,
    });

    console.log(res.data);

    if (res.data.success) {
      navigate('/');
    }else{
      alert(res.data.message);
    }

    console.log(data);
  };

  return (
    <form
      className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Welcome Back!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          We missed you, sign in to continue.
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
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-500">Email is required</span>}
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
              {...register('password', { required: true })}
            />
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>
          <div className="mt-10">
            <button
              className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
              type="submit"
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
        <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
          Don't have an account?
          <a className="font-medium underline" onClick={() => navigate('/signup')}>Sign up</a>
        </div>
      </div>
    </form>
  );
};

export default Login;
