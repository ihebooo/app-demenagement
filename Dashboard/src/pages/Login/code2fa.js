import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api_nestjs } from "../../utils/client";
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
} from 'react-query'
import { toast } from 'react-hot-toast';

const Code2fa = () => {
    const { state, dispatch } = useAuth();
  
  
    const navigate = useNavigate();
  

    const [verificationCode, setVerificationCode] = useState('');

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  const token_2fa = searchParams.get("token_2fa")


  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    mutate,
  } = useMutation(async (params) => await api_nestjs.post("/admin/verif-2fa", params),
      {  
        onSuccess : (data) => {

          console.log({data})
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.username, token: data.token } });
          navigate(`/`);
        },
        onError : (error) =>{
          toast.error(error)
        }
      }
  );

  const handleVerification = () => {


    mutate({token_2fa : token_2fa, code :  verificationCode})
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-600 to-blue-400">
      <h2 className="text-3xl font-semibold text-white mb-6">2FA Code Authentication</h2>

      <p className="text-sm font-semibold text-white mb-6">Code sent to {email}</p>

      <div className="bg-white rounded-lg shadow-md p-8 text-center w-72">
        <input
          type="text"
          className="w-full text-3xl font-bold mb-6 border-2 border-indigo-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={handleVerification}
        >
          Verify
        </button>
      </div>

      <p className="mt-6 text-white text-sm">
        If you didn't receive the code, please check your device or request a
        new one.
      </p>
    </div>
  );
};

export default Code2fa;
