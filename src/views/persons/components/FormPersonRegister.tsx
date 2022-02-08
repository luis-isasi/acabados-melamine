import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { createPerson } from '@Services/person';
import { RegisterDataI } from '@Types/user';
import MessageError from '@Components/molecules/MessageError';
import ModalPersonSuccess from '../Modals/ModalPersonSuccess';

interface Props {
  onSuccess?: () => void;
}

const FormPersonRegister = ({ onSuccess }: Props) => {
  const [isErrorDni, setIsErrorDni] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation('createPerson', createPerson, {
    onSuccess: (data) => {
      if (!data?.error) {
        reset();
        onSuccess();
        setIsOpenModalSuccess(true);
        setIsErrorDni(false);
      } else {
        setIsErrorDni(true);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDataI>();

  const onSubmit: SubmitHandler<RegisterDataI> = (data) => {
    mutate(data);
  };

  return (
    <>
      <ModalPersonSuccess
        isOpen={isOpenModalSuccess}
        setIsOpen={setIsOpenModalSuccess}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-xl p-8 flex flex-col ml-1 mt-15"
        style={{
          boxShadow: '0px 0px 40px rgba(29, 26, 26, 0.1)',
        }}
      >
        <div className="flex flex-col mb-3">
          <label className="font-bold mb-2">Nombres y Apellidos</label>
          <input
            type="text"
            placeholder=""
            className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
            {...register('username', { required: true })}
          />
          {errors.username && (
            <MessageError>
              {errors.username.type === 'required' &&
                'Los nombres y apellidos son requeridos'}
            </MessageError>
          )}
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-bold mb-2">DNI</label>
          <input
            type="number"
            className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
            {...register('dni', { required: true, maxLength: 8, minLength: 8 })}
          />
          {errors.dni && (
            <MessageError>
              {errors.dni.type === 'required' && 'El DNI es requerido'}
              {(errors.dni.type === 'maxLength' ||
                errors.dni.type === 'minLength') &&
                'El DNI debe tener 8 caracteres'}
            </MessageError>
          )}
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-bold mb-2">Correo Electronico</label>
          <input
            type="text"
            className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <MessageError>
              {errors.email.type === 'required' && 'El email es requerido'}
              {errors.email.type === 'pattern' && 'El email no es válido'}
            </MessageError>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-bold mb-2">Fecha de nacimiento</label>
          <input
            type="date"
            className="py-2 px-6 focus:outline-none rounded-xl mb-2 border-1 border-gray-400"
            {...register('dateOfBirth', {
              required: true,
              pattern: /^\d{4}-\d{2}-\d{2}$/,
            })}
          />
          {errors.dateOfBirth && (
            <MessageError>
              {errors.dateOfBirth.type === 'required' &&
                'La fecha es requerida'}
              {errors.dateOfBirth.type === 'pattern' &&
                'El formato es incorrecto'}
            </MessageError>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-2">Celular</label>
          <input
            type="number"
            className="py-2 px-6 focus:outline-none rounded-xl mb-2 border-1 border-gray-400"
            {...register('phone', {
              required: true,
              maxLength: 9,
              minLength: 9,
            })}
          />
        </div>
        {errors.phone && (
          <MessageError>
            {errors.phone.type === 'required' && 'El numero es requerido'}
            {(errors.phone.type === 'maxLength' ||
              errors.phone.type === 'minLength') &&
              'El numero debe tener 9 digitos'}
          </MessageError>
        )}

        {isErrorDni && (
          <MessageError>
            El DNI ya se encuentra registrado, por favor ingrese otro DNI
          </MessageError>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="mt-4 bg-yellow-300 font-bold text-lg px-6 py-2 rounded-xl disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
        >
          Agregar Persona
        </button>
      </form>
    </>
  );
};

export default FormPersonRegister;
