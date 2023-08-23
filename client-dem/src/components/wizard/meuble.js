import { MdAddCircle,MdRemoveCircle } from "react-icons/md";
import { api_nestjs } from "../../utils/client";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Button,
} from "@tremor/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { useRecoilState } from 'recoil';
import { globalState } from '../../utils/atom';

import {  useWizard } from 'react-use-wizard';

const Meubles = () => {

  const [gState, setgState] = useRecoilState(globalState);

  const { handleStep, previousStep, nextStep } = useWizard();


  const { data, isLoading, isError } = useQuery(
    "get-meubles",
    () =>
      api_nestjs.get("/categories", {
        // ...
      }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  const [clientMeubles, setClientMeubles] = useState([]);



  React.useEffect(() => {
    const storedMeubles = localStorage.getItem('meubles');
  
    if (storedMeubles) {
      setClientMeubles(JSON.parse(storedMeubles));
    }

  }, []);

    function meubleQuantity(meuble){



      let meubleExist = clientMeubles.find(m => m.id === meuble.id)
        if(meubleExist){

          return meubleExist.quantity
      

        }
        return 0

    }


    function incrementMeuble(meuble) {
      let meubleExist = clientMeubles.find(m => m.id === meuble.id);
    
      if (!meubleExist) {
        let updatedClientMeubles = [...clientMeubles, { ...meuble, quantity: 1 }];
        setClientMeubles(updatedClientMeubles);
      } else {
        let updatedClientMeubles = clientMeubles.map(m => {
          if (m.id === meuble.id) {
            return { ...m, quantity: m.quantity + 1 };
          }
          return m;
        });
        setClientMeubles(updatedClientMeubles);
      }
    }
    

    function decrementMeuble(meuble) {
      const updatedClientMeubles = clientMeubles.map(m => {
        if (m.id === meuble.id) {
          if (m.quantity > 0) {
            return { ...m, quantity: m.quantity - 1 };
          } else {
            return { ...m, quantity: 0 }; // Ensure quantity doesn't become negative
          }
        }
        return m;
      });
    
      setClientMeubles(updatedClientMeubles);
    }

  const handleMeuble = (action, meuble, event) => {

    event.preventDefault();

    if(action === "+"){
      incrementMeuble(meuble)


    }else if(action === "-"){
      decrementMeuble(meuble)
    }
  };


  const goNext = () => {


    let form_meubles  = clientMeubles.filter(m => m.quantity > 0)

    if(form_meubles.length <= 0){
      
      toast.error("choisissez un meuble")
      return false
    } 


    setgState({...gState, meubles : form_meubles})
    localStorage.setItem('meubles', JSON.stringify(form_meubles));

    nextStep()


  }


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching meubles data</div>;
  }

  return (
    <>
    <ul role="list" className="">
      {data &&
        data.map((cat,key) => (
          <>
          <h2 className="flex justify-center font-bold text-2xl p-12 text-indigo-600">{cat.title}</h2>

            <ul key={key} role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >
              {cat.meubles.map((meuble) => {
              
              let quantity=meubleQuantity(meuble)
                
              return (
                <li
                  key={meuble.id}
                  className="col-span-1 flex flex-col text-center bg-white border-3 border-slate-600	 rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="flex-1 flex flex-col p-8">
                  <span className="flex justify-end">

                  <span className="rounded-full bg-orange-600 px-4 py-2 text-white text-gray-600">
                    
                    <span className="font-bold ">{quantity}</span>
                    
                  </span>
                  </span>

                    <img
                      className="w-32 h-32 flex-shrink-0 mx-auto rounded-sm"
                      src={meuble.img}
                      alt=""
                    />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">
                      {meuble.title}
                    </h3>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="-ml-px w-0 flex-1 flex">
                        <a
                          className="relative w-0 flex-1 inline-flex cursor-pointer items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >

              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button
                     onClick={(e) => handleMeuble("+",meuble, e)}
                      type="button"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <MdAddCircle className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                       onClick={(e) => handleMeuble("-",meuble, e)}
                      type="button"
                      className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <MdRemoveCircle className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>


                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              )})}

            </ul></>))}
            

          
    </ul>

              <div className="flex justify-end mt-6">
              
                <button
                  onClick={goNext}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              </div>

    </>
  );
};

export default Meubles;