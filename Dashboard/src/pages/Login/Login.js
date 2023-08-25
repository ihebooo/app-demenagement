import React, { useContext, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api_nestjs } from "../../utils/client";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  useMutation,
} from 'react-query'
import { toast } from 'react-hot-toast';




function Login(props) {
  const { state, dispatch } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  let { isAuthenticated } = state

  const navigate = useNavigate();

  React.useEffect(()=> {

      if(isAuthenticated){

        navigate('/');
  
      }

  },[isAuthenticated])





  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    mutate,
  } = useMutation(async (params) => await api_nestjs.post("/admin/login", params),
      {  
        onSuccess : (data) => {
          //dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.username, token: data.token } });
          navigate(`/code2fa?email=${data.email}&token_2fa=${data.token_2fa}`);
        },
        onError : (error) =>{
          toast.error(error)
        }
      }
  );


  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic and update authentication state
    const user = { username, password };
    dispatch({ type: 'LOGIN', payload: user });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    mutate(user)
  };

  return (
    <>
    {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    */}
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={logo}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account Admin</h2>

        <h4 className="mt-6 text-center text-sm text-red-900">{isError && error}</h4>
        
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={handleInputChange}
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}


export default Login;
