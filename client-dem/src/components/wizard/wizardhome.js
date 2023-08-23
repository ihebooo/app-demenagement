import React,{ useState } from 'react'
import Footer from '../Footer';
import Header from '../header';
import Wizard from './wizard'
import Meubles from './meuble';
import Form1 from './form1';
import ClientForm from './form2';
import ButtonSubmit from './buttonSubmit';
import { Wizard as WizardReact, useWizard } from 'react-use-wizard';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import { globalState } from '../../utils/atom';

function WizardWrapper({setIsLoading}) {
 
  const [gState, setgState] = useRecoilState(globalState);

  console.log({gState})

  React.useEffect(() => {
    // Clear local storage items when the page is about to unload
    window.onbeforeunload = () => {
      localStorage.removeItem('departForm');
      localStorage.removeItem('arriveeForm');
      localStorage.removeItem('clientForm');
      localStorage.removeItem('meubles');
      localStorage.removeItem('currentStep');
    };

    // Clear the event handler when the component unmounts
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className="bg-white">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg relative isolate px-6 pt-14 lg:px-8">
            <div className="px-8 p-24">
            
          <div className="px-8 p-24">

            <WizardReact
              header={<Wizard />}
            >

                <Meubles/>
                <Form1/>
                <ClientForm setIsLoading={setIsLoading}/>

            </WizardReact>

          </div>
        </div>
      </div>

     
    </div>
    <Footer />
    </div>
  );
}


export default function WizardHome({setIsLoading}){

  return (<RecoilRoot><WizardWrapper setIsLoading={setIsLoading} /></RecoilRoot>)
}