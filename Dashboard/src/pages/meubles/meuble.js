import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid'
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'

import { Card,Table,TableHead,TableRow,TableHeaderCell,TableBody,TableCell,Text,Title,Badge,Button,} from "@tremor/react";
import {api_nestjs} from "../../utils/client"

import {useQuery,} from 'react-query'
import CreateModal from './create-meuble'
import UpdateModal from './update-meuble'
import Example from './delete-meuble'


import LoaderWithOverlay from "../../components/common/overlay-loader"




const Meubles = () => {

    const [selectedCategory, setSelectedCategory] = useState('all'); // Initialize with 'all'
    
    // ... (other code)
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)


  const [selectedMeuble, setselectedMeuble] = useState({})


  function editMeal(meal){

    setselectedMeuble(meal)
    setOpen1(!open1)
  }

  function deletemeal(meal){

    setselectedMeuble(meal)
    setOpen2(!open2)
  }


  const { data, isLoading, isFetching, refetch, isError} = useQuery('get-meubles', () =>  
  
  api_nestjs.get("/meubles",  { headers : {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }}),
  { 
    onSuccess : (data) => {

     console.log(data)

    },
    
  }
);
const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useQuery('get-categories', () =>
api_nestjs.get("/categories", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}),
{
  onSuccess: (data) => {
    //console.log(data)
  },
}
);





  return (
  <>
    {open  && (<CreateModal refresh={refetch} setOpen={setOpen} open={open} />)}
   
    {open1  && (<UpdateModal refresh={refetch} meuble={selectedMeuble} setOpen1={setOpen1} open1={open1} />)}

    {open2  && (<Example refresh={refetch} meuble={selectedMeuble} setOpen2={setOpen2} open2={open2} />)}

   



    {isLoading || isFetching && (<LoaderWithOverlay/>)}
       
      
    
    


    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Meubles List</h3>
        <div className="w-40">
          
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            {categoriesData && categoriesData.map((cat, index) => (
              <option value={cat.cat_id} key={index}>{cat.title}</option>
            ))}
          </select>
        </div>
      


      <div className="mt-3 sm:mt-0 sm:ml-4">
        <div className="flex rounded-md shadow-sm">
          
          <button
        type="button"
        onClick={()=> setOpen(!open)}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add
        <PlusSmIconSolid className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>

        </div>
      </div>
    </div>
  <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Meuble
                  </th>
                  
                 
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {data && data
              .filter((meuble) => selectedCategory === 'all' || meuble.category.title === selectedCategory)
                .map((meuble, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-sm" src={meuble.img} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{meuble.title}</div>
                          <div className="text-sm text-gray-500">{meuble.category.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900"></div>
                    </td>
                    
                    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        onClick={()=> deletemeal(meuble)}

        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Delete
      </button>

      
      <button
        type="button"
        onClick={()=> editMeal(meuble)}


        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Edit
      </button>
      
    </span>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default Meubles;
