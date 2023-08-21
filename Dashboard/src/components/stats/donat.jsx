import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { api_nestjs } from '../../utils/client'
import { useQuery } from 'react-query';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {


  

  const [stats, setStats] = useState([])

  const [numClients, setNumClients] = useState(0)
  const [lastId, setLastId] = useState(0)

  const { data: ordersData } = useQuery('get-devis', () =>
  api_nestjs.get('/admin/devis', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  {

    onSuccess : (data) => {


      setStats([...stats, { id: 1, name: 'Total Devis', stat: data.length, icon: UsersIcon, change: '22', changeType: 'increase' }])

    }
  }
);

const { data: categories } = useQuery('get-categories', () =>
api_nestjs.get('/categories', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}),
{

  onSuccess : (data) => {


    setStats([...stats, { id: 2, name: 'Total Categories', stat: data.length, icon: UsersIcon, change: '22', changeType: 'increase' }])

  }
}

);


const { data: meubles, isLoading } = useQuery('get-meubles', () =>
api_nestjs.get('/meubles', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}),
{

  onSuccess : (data) => {


    setStats([...stats, { id: 3, name: 'Total Meubles', stat: data.length, icon: UsersIcon, change: '22', changeType: 'increase' }])

  }
}

);


  return (
    <div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      
        { !isLoading &&  stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
