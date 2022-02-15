import { useQuery } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';
import MessageError from '@Components/molecules/MessageError';
import { getAllPersons } from '@Services/person';
import { PersonDataI } from '@Types/person';

interface Props {
  onSuccess?: () => void;
  setStep: (step: 1 | 2) => void;
  setPerson: (person: PersonDataI | undefined) => void;
}

const VerifyPerson = ({ setStep, onSuccess, setPerson }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: persons, isLoading } = useQuery('getAllPersons', getAllPersons);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ dni: number }>();

  const onSubmit: SubmitHandler<{ dni: number }> = ({ dni }) => {
    setErrorMessage(null);
    const existPerson = persons.data.find(
      (person) => person.attributes.dni === Number(dni)
    );

    if (existPerson) {
      setPerson(existPerson.attributes);
      onSuccess && onSuccess();
      setStep(2);
    } else {
      console.log('no Existe');
      setErrorMessage('No existe persona con ese DNI 😕');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-94 mx-auto"
      >
        <h4 className="text-2xl font-bold text-center mb-5">
          Verica que el cliente exista antes de realizar una venta 😀
        </h4>
        <div className="flex flex-col mb-5">
          <label className="font-bold mb-2">Dni</label>
          <input
            type="number"
            placeholder=""
            className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
            {...register('dni', { required: true, maxLength: 8, minLength: 8 })}
          />
          {errors.dni && (
            <MessageError>
              {errors.dni.type === 'required' && 'El dni es requerido'}
              {(errors.dni.type === 'maxLength' ||
                errors.dni.type === 'minLength') &&
                'El dni debe tener 8 digitos'}
            </MessageError>
          )}
        </div>
        {errorMessage && <MessageError>{errorMessage}</MessageError>}
        <button
          type="submit"
          disabled={isLoading}
          className="max-w-max bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-2xl mx-auto"
        >
          Verificar persona
        </button>
      </form>
    </div>
  );
};

export default VerifyPerson;
