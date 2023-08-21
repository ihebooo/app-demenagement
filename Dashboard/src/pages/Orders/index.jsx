import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

import { api_nestjs } from '../../utils/client';
import{CgProfile} from 'react-icons/cg'
import OrderModal from './modalDevi'
import { formatDate } from '../../utils/table-pagination'
function Orders() {

  const [open, setOpen] = useState(false)
  

  const [selectedOrder, setSelectedOrder] = useState({})


  function openOrder(order){

    console.log({order})
    setSelectedOrder(order)
    setOpen(!open)
  }

  const { data: ordersData, isLoading: ordersLoading, isError: ordersError } = useQuery('get-devis', () =>
    api_nestjs.get('/admin/devis', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  );

  if (ordersLoading) {
    return <p>Loading...</p>;
  }

  if (ordersError) {
    return <p>Error loading orders: {ordersError.message}</p>;
  }


  return (
    <>
     {open  && (<OrderModal setOpen={setOpen} open={open} order={selectedOrder} />)}

    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {ordersData.map((order) => (
          <li key={order.id}>
            <a href={void(0)} onClick={(e)=> openOrder(order)} className="block hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="h-32 w-32 rounded-full text-7xl"  > <CgProfile /> </span>
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">{order.client.nom_prenom.toUpperCase()}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MdEmail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="truncate">{order.client.email}</span>
                        
                      </p>

                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <BsFillTelephoneFill className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="truncate">{order.client.tel}</span>
                        
                      </p>

                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className='font-bold'>date demenagement : </span><span>{formatDate(order.date_dem)}</span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Orders;
