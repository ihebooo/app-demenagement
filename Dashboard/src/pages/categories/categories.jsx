import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Title, Badge, Button } from "@tremor/react";
import { api_nestjs } from "../../utils/client"
import {
  useQuery,useMutation
} from 'react-query'
import toast from 'react-hot-toast'
import CreateModal from "./add-category"
import { DotsVerticalIcon,SearchIcon } from '@heroicons/react/solid'
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'
import {BsTrash3} from 'react-icons/bs'

const Categories = () => {


  const [open,setOpen] = useState(false);
 

  

  const { data, isLoading, isFetching, refetch, isError } = useQuery('get-categories', () =>
    api_nestjs.get("/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    ,{
      onSuccess: (data) => {
        console.log(data)
      }
    });

  const handleMouseOver = (event) => {
    event.currentTarget.querySelector('.category-description').style.opacity = 1;
  };

  const handleMouseOut = (event) => {
    event.currentTarget.querySelector('.category-description').style.opacity = 0;
  };

  const handleAddCategory = () => {

    setOpen(!open)
    // Implement logic for adding a new category here
  };

  const {
    error,
    isSuccess,
    mutate,
  } = useMutation(async (params) => await api_nestjs.post(`/categories/remove/${params.id}`,{},{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
      {  
        onSuccess : (data) => {
            toast.success('Category deleted successfully')
            refetch();
        }
      }
  );


  const removeCategory = (cat_id) => {

    mutate({id: cat_id})
  };


  return (
    <>
        {open  && (<CreateModal refresh={refetch} setOpen={setOpen} open={open} />)}

        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-lg leading-6 font-medium text-gray-900"> Categories List </h3>


      <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
              placeholder="Search"
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden focus:ring-indigo-500 px-4 py-2 focus:border-indigo-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
              placeholder="Search candidates"
            />
          </div>
          <button
        type="button"
        onClick={()=> setOpen(!open)}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add
        <PlusSmIconSolid className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>

        </div>
      </div>
    </div>


        <div>

      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data && data.map((cat,key) => (
          <li key={key} className="col-span-1 flex shadow-sm rounded-md">
            <div
              className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-gray-400"
            >
              {cat.Title}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <span className="text-gray-900 font-medium hover:text-gray-600">
                  {cat.title}
                </span>
                <p className="text-gray-500"> {cat.meubles.length} meubles</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button onClick={()=>removeCategory(cat.id)}
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  <BsTrash3 className="w-5 h-5 text-red" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Categories;
