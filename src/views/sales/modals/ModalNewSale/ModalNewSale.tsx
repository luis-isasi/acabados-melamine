import ModalBase from '@Modals/ModalBase';
import { useState } from 'react';
import VerifyPerson from './sections/VerifyPerson';
import IconClose from '@Icons/IconClose';
import { PersonDataI } from '@Types/person';
import SaleForm from './sections/SaleForm';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const ModalNewSale = ({ setIsOpen }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [person, setPerson] = useState<PersonDataI | undefined>(undefined);

  return (
    <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="absolute top-5 right-4 font-bold text-white"
      >
        <IconClose className="w-8 h-8" />
      </button>
      <div className="bg-white p-5 rounded-2xl">
        {step === 1 && <VerifyPerson setStep={setStep} setPerson={setPerson} />}
        {step === 2 && person && (
          <SaleForm person={person} setIsOpen={setIsOpen} />
        )}
      </div>
    </ModalBase>
  );
};

export default ModalNewSale;
