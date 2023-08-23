import React, { useState } from 'react';
import DatePicker from './datePicker'; // Make sure to import the correct DatePicker component
import { useWizard } from 'react-use-wizard';
import { toast } from "react-hot-toast";
import { useRecoilState } from 'recoil';
import { globalState } from '../../utils/atom';
import TableDevi from './tabledevi';
import { api_nestjs } from '../../utils/client';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ClientForm = ({setIsLoading}) => {

  const navigate = useNavigate()
  const { handleStep, previousStep } = useWizard();

  const [gState, setgState] = useRecoilState(globalState);

  const [clientForm, setClientForm] = useState({
    nom_prenom: '',
    email: '',
    tel: '',
    date: new Date(),
    message: '',
  });

  const [clientFormErrors, setClientFormErrors] = useState({
    nom_prenom: false,
    email: false,
    tel: false,
    date: false,
    message : true
  });

  React.useEffect(() => {
    const storedclientForm = localStorage.getItem('clientForm');
  
    if (storedclientForm) {
      setClientForm(JSON.parse(storedclientForm));
    }

  }, []);


  const handleDateChange = (date) => {
    setClientForm({ ...clientForm, date: date });
  };
  const validateForm = () => {


    const form = clientForm

    let formErrors = {...clientFormErrors }
    let formValid = true;

    for (const key in form) {

      
      if (form[key].length < 2 && key != "message") {

        formErrors[key] = true;
        formValid = false;

      } else {
        formErrors[key] = false;
      }
    }

    setClientFormErrors(formErrors);
  

    return formValid;
  };



  const {
    error,
    isError,
    isLoading,
    isSuccess,
    mutate,
  } = useMutation(async (params) => await api_nestjs.post("/api/post-request", params,),
      {  
        onSuccess : (data) => {
          localStorage.removeItem('departForm');
          localStorage.removeItem('arriveeForm');
          localStorage.removeItem('clientForm');
          localStorage.removeItem('meubles')
          localStorage.removeItem('currentStep')
          setIsLoading(false)
            navigate("/success")
        },
        onError : (error) => {
          
          toast.error(error)
          setIsLoading(false)
      }

      }
  );

  const [submit, setSubmit] = React.useState(false)
  const goNext =  () => {


    let valid_form = validateForm();

    console.log({valid_form,clientFormErrors})

    if(valid_form){
      
       setgState({...gState, form_client : clientForm})
       
       localStorage.setItem('clientForm', JSON.stringify(clientForm));


       setSubmit(true)

    }else{
      toast.error("fill informations please")

      setSubmit(false)
    } 

  }

  React.useEffect(() => {
    if (submit) {

      setIsLoading(true)
      console.log("form_client has been updated:", gState.form_client);
      mutate(gState);
    }
  }, [submit, gState]);
  


  return (
    <>
    <div className="container mx-auto p-4">
      <form className="max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Client Form</h2>

        {/* Nom Prenom */}
        <div className={`mb-4 ${clientForm.nom_prenom ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrive-rue">
                Nom Prenom
              </label>
              <input
                type="text"
                id="arrive-rue"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  clientFormErrors.nom_prenom ? 'border-red-500' : ''
                }`}
                value={clientForm.nom_prenom}
                onChange={(e) => setClientForm({ ...clientForm, nom_prenom: e.target.value })}
              />
              {clientFormErrors.nom_prenom && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid nom_prenom.</p>
              )}
            </div>


        <div className={`mb-4 ${clientFormErrors.email ? 'border-red-500' : ''}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              clientFormErrors.email ? 'border-red-500' : ''
            }`}
            value={clientForm.email}
            onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
          />
          {clientFormErrors.email && (
            <p className="text-red-500 text-xs mt-1">Please provide a valid email.</p>
          )}
        </div>
        

        <div className={`mb-4 ${clientFormErrors.tel ? 'border-red-500' : ''}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
            Tel
          </label>
          <input
            type="tel"
            id="tel"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              clientFormErrors.tel ? 'border-red-500' : ''
            }`}
            value={clientForm.tel}
            onChange={(e) => setClientForm({ ...clientForm, tel: e.target.value })}
          />
          {clientFormErrors.tel && (
            <p className="text-red-500 text-xs mt-1">Please provide a valid tel.</p>
          )}
        </div>

        <div className={`mb-4 ${clientFormErrors.date ? 'border-red-500' : ''}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
            Date Demenagement
          </label>
          <DatePicker
            selectedDate={clientForm.date}
            onDateChange={handleDateChange}
          />
          {clientFormErrors.date && (
            <p className="text-red-500 text-xs mt-1">Please provide a valid date.</p>
          )}
        </div>



        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
            Message
          </label>
          <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 resize-none"
              value={clientForm.message}
              onChange={(e) => setClientForm({ ...clientForm, message: e.target.value })}
              placeholder="Enter your message..."
            />
        </div>
       


      </form>
      <TableDevi data={gState}/>

    </div>
    <div className="flex justify-end mt-6">
                  <button
                    onClick={previousStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Previous
              </button>
                <button
                  onClick={goNext}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Valider
                </button>
              </div>


              

    </>
  );
};

export default ClientForm;
