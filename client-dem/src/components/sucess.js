import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import logo from '../assets/logo.png'
import Footer from './Footer';
import Header from './header';
import SuccessToast from './successtoast';

export default function Sucess() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
    <div className="bg-white">
     
     <Header />

     
    <SuccessToast/>


    <Footer />
    </div>
    </div>
  )
}
