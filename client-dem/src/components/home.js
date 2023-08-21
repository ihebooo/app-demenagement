import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import logo from '../assets/logo.png'
import Footer from './Footer';
import Header from './header';
import Indexhome from './indexhome'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
    <div className="bg-white">
     
     <Header />

     
     <Indexhome/>


    <Footer />
    </div>
    </div>
  )
}
