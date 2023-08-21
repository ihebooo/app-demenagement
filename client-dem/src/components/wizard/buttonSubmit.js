import React, { useState, useEffect } from 'react';
import { MailIcon } from '@heroicons/react/solid';


const ButtonSubmit = () => {
  const [scrollPosition, setScrollPosition] = useState(window.screen.availHeight/2);

  useEffect(() => {
    const handleScroll = () => {

      console.log({s : window.scrollY, av : window.screen.availHeight})
       
      let availHeight = window.screen.availHeight

      let scrollY = window.scrollY

      let pos = 0

      if(scrollY <=0){

        pos = availHeight/2
      }else{

        pos = scrollY*2
      }
      setScrollPosition(pos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ... your existing code ...

  return (
    <div className="container mx-auto p-4 relative">
      {/* ... your existing form code ... */}
      <div
   
        className="fixed bottom-4 right-4 transition-all duration-300 transform" style={{ top: `${scrollPosition}px` }}
      >
        
        <button
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MailIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        Confirm
      </button>
      </div>
    </div>
  );
};

export default ButtonSubmit;
