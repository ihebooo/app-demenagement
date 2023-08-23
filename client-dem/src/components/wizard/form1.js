import React, { useState } from 'react';
import { countryList } from '../../utils/countries';
import {  useWizard } from 'react-use-wizard';
import { toast } from "react-hot-toast";
import { useRecoilState } from 'recoil';
import { globalState } from '../../utils/atom';
import ButtonSubmit from './buttonSubmit';


const Form1 = React.memo(function Form1({}) {

  const [gState, setgState] = useRecoilState(globalState);

  const { handleStep, previousStep, nextStep } = useWizard();

  const [departForm, setDepartForm] = useState({
    type: "Depart",
    rue: '',
    code_postal: '',
    ville: '',
    pays: '',
  });

  const [arriveeForm, setArriveeForm] = useState({
    type: "Arrivee",
    rue: '',
    code_postal: '',
    ville: '',
    pays: '',
  });

  const [departFormErrors, setDepartFormErrors] = useState({
    rue: false,
    code_postal: false,
    ville: false,
    pays: false,
  });

  const [arriveeFormErrors, setArriveeFormErrors] = useState({
    rue: false,
    code_postal: false,
    ville: false,
    pays: false,
  });

  React.useEffect(() => {
    const storedDepartForm = localStorage.getItem('departForm');
    const storedArriveeForm = localStorage.getItem('arriveeForm');
  
    if (storedDepartForm) {
      setDepartForm(JSON.parse(storedDepartForm));
    }
    if (storedArriveeForm) {
      setArriveeForm(JSON.parse(storedArriveeForm));
    }
  }, []);
  

  const validateForm = (formName) => {


    const form = formName === 'depart' ? departForm : arriveeForm;

    let formErrors = formName === 'depart' ? { ...departFormErrors } : { ...arriveeFormErrors };
    let formValid = true;

    for (const key in form) {
      if (form[key].length < 2) {

        formErrors[key] = true;
        formValid = false;

      } else {
        formErrors[key] = false;
      }
    }

    if (formName === 'depart') {
      setDepartFormErrors(formErrors);
    } else {
      setArriveeFormErrors(formErrors);
    }

    return formValid;
  };




  const goNext = () => {
    let valid_form_dep = validateForm('depart');
    let valid_form_arr = validateForm('arrive');
  
    if (valid_form_dep && valid_form_arr) {
      setgState({ ...gState, form_address: { dep: departForm, arr: arriveeForm } });
  
      // Save data to local storage
      localStorage.setItem('departForm', JSON.stringify(departForm));
      localStorage.setItem('arriveeForm', JSON.stringify(arriveeForm));
      

      nextStep()
    }
  };
  

  return (

    
    <>
    <div className="container mx-auto p-12">
      <div className="flex space-x-32">
        <form  className="flex-1">
          <h2 className="text-lg font-bold mb-2">Depart Address</h2>

          <div className={`mb-4 ${departFormErrors.rue ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="depart-rue">
                Rue
              </label>
              <input
                type="text"
                id="depart-rue"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  departFormErrors.rue ? 'border-red-500' : ''
                }`}
                value={departForm.rue}
                onChange={(e) => setDepartForm({ ...departForm, rue: e.target.value })}
              />
              {departFormErrors.rue && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid rue.</p>
              )}
            </div>


            <div className={`mb-4 ${departFormErrors.code_postal ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="depart-rue">
                Code Postal
              </label>
              <input
                type="text"
                id="depart-codepostal"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  departFormErrors.code_postal ? 'border-red-500' : ''
                }`}
                value={departForm.code_postal}
                onChange={(e) => setDepartForm({ ...departForm, code_postal: e.target.value })}
              />
              {departFormErrors.code_postal && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid code postal.</p>
              )}
            </div>

       
       
            <div className={`mb-4 ${departFormErrors.ville ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="depart-rue">
                Ville
              </label>
              <input
                type="text"
                id="depart-ville"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  departFormErrors.ville ? 'border-red-500' : ''
                }`}
                value={departForm.ville}
                onChange={(e) => setDepartForm({ ...departForm, ville: e.target.value })}
              />
              {departFormErrors.ville && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid ville.</p>
              )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="depart-pays">
                  Pays
                </label>
                <select
                  id="depart-pays"
                  className={`w-full px-3 py-2 border rounded focus:outline-none ${
                    departFormErrors.pays ? 'border-red-500' : 'border-blue-500'
                  }`}
                  value={departForm.pays}
                  onChange={(e) =>
                    setDepartForm({ ...departForm, pays: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countryList.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {departFormErrors.pays && (
                  <p className="text-red-500 text-xs mt-1">Please select a country.</p>
                )}
              </div>


        </form>

          {/*  arriveForm */}

        <form  className="flex-1">
          <h2 className="text-lg font-bold mb-2">Arrivee Address</h2>

          <div className={`mb-4 ${arriveeFormErrors.rue ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrive-rue">
                Rue
              </label>
              <input
                type="text"
                id="arrive-rue"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  arriveeFormErrors.rue ? 'border-red-500' : ''
                }`}
                value={arriveeForm.rue}
                onChange={(e) => setArriveeForm({ ...arriveeForm, rue: e.target.value })}
              />
              {arriveeFormErrors.rue && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid rue.</p>
              )}
            </div>


            <div className={`mb-4 ${arriveeFormErrors.code_postal ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrive-rue">
                Code Postal
              </label>
              <input
                type="text"
                id="arrive-codepostal"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  arriveeFormErrors.code_postal ? 'border-red-500' : ''
                }`}
                value={arriveeForm.code_postal}
                onChange={(e) => setArriveeForm({ ...arriveeForm, code_postal: e.target.value })}
              />
              {arriveeFormErrors.code_postal && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid code postal.</p>
              )}
            </div>

       
       
            <div className={`mb-4 ${arriveeFormErrors.ville ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrive-rue">
                Ville
              </label>
              <input
                type="text"
                id="arrive-ville"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                  arriveeFormErrors.ville ? 'border-red-500' : ''
                }`}
                value={arriveeForm.ville}
                onChange={(e) => setArriveeForm({ ...arriveeForm, ville: e.target.value })}
              />
              {arriveeFormErrors.ville && (
                <p className="text-red-500 text-xs mt-1">Please provide a valid ville.</p>
              )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrive-pays">
                  Pays
                </label>
                <select
                  id="arrive-pays"
                  className={`w-full px-3 py-2 border rounded focus:outline-none ${
                    arriveeFormErrors.pays ? 'border-red-500' : 'border-blue-500'
                  }`}
                  value={arriveeForm.pays}
                  onChange={(e) =>
                    setArriveeForm({ ...arriveeForm, pays: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countryList.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {arriveeFormErrors.pays && (
                  <p className="text-red-500 text-xs mt-1">Please select a country.</p>
                )}
              </div>



          {/* Add more input fields for arriveeForm */}
        </form>
      </div>
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
                  Next
                </button>
              </div>
    </>
  );
});

export default Form1;
