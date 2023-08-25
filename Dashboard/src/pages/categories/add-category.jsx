import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {  XIcon } from '@heroicons/react/outline'
import{IoAddCircleSharp} from "react-icons/io5";
import {api_nestjs} from "../../utils/client"
import {
  useQuery,useMutation
} from 'react-query'
import toast from 'react-hot-toast'
export default function CreateModal({refresh,setOpen,open}) {

  const { data, isLoading, isError } = useQuery('get-categories', () =>
  api_nestjs.get("/categories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  ,{
    onSuccess: (data) => {
      // console.log(data)
    }
  }
);

  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl	 sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <IoAddCircleSharp className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add Category
                  </Dialog.Title>
                  <div className="mt-2">
                    
                  {!isLoading && (<Form refresh={refresh} setOpen={setOpen} data={data} />)}

                        

                  </div>
                </div>
              </div>
           
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}



function Form({refresh,data,setOpen}){

    const {
        error,
        isError,
        isLoading,
        isSuccess,
        mutate,
      } = useMutation(async (params) => await api_nestjs.post("/categories/add", params,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }),
          {  
            onSuccess : (data) => {
                toast.success('Category added successfully')
                setOpen(false)
                refresh();
            }
          }
      );
    
    function handleSubmit(event){

        event.preventDefault();


        let {Category_name } = event.target.elements

        let body = {
          title: Category_name.value,
          
        };


        mutate(body)

    }


    return (
        <form className="space-y-8 divide-y divide-gray-200"  onSubmit={handleSubmit}>
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <p className="mt-1 text-sm text-gray-500">
                 Fill this form to add a Category
                </p>
              </div>

            {isError && (      <span className="flex p-2 m-4 justify-center items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
        {error}
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-400 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
        >
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      </span>)}



            </div>
    
            <div className="pt-2">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

             

       
    
                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Category name
                  </label>
                  <div className="mt-1">
                    <input
                    required
                      type="text"
                      name="Category_name"
                      id="Category_name"
                      autoComplete="Category_name"
                      className="p-2 border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
    
    

    
 


    
               
  


              </div>

            </div>
              </div>
    
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                onClick={()=> setOpen(false)}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )
        

}