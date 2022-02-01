import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import IconClose from '@Icons/IconClose';
import { updatePerson } from '@Services/person';
import MessageError from '@Components/molecules/MessageError';
import ModalBase from '@Modals/ModalBase';
import { PersonResponseI, PersonDataI } from '@Types/person';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  person: PersonResponseI;
  refetch: () => void;
}

const ModalPersonEdit = ({ setIsOpen, isOpen, person, refetch }: Props) => {
  const { isLoading, mutate } = useMutation('updatePerson', updatePerson, {
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonDataI>({
    defaultValues: {
      ...person.attributes,
    },
  });

  const onSubmit: SubmitHandler<PersonDataI> = (data) => {
    mutate({ id: person.id, personData: data });
  };

  return (
    <>
      {isOpen && (
        <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center ">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-4 font-bold text-white"
          >
            <IconClose className="w-8 h-8" />
          </button>
          <div className="bg-white min-w-102 py-8 px-12 rounded-3xl">
            <h4 className="font-bold text-2xl text-center mb-5">
              Editar Cliente
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-yellow-100 rounded-xl p-8 flex flex-col"
            >
              <div className="flex flex-col mb-2">
                <label className="font-bold">Nombres y Apellidos</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl"
                  {...register('username', { required: true })}
                />
              </div>
              {errors.username && (
                <MessageError>
                  {errors.username.type === 'required' &&
                    'Los nombres y apellidos son requeridos'}
                </MessageError>
              )}
              <div className="flex flex-col mb-2">
                <label className="font-bold">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="py-2 px-6 focus:outline-none rounded-xl mb-2"
                  {...register('dateOfBirth', {
                    required: true,
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                  })}
                />
              </div>

              {errors.dateOfBirth && (
                <MessageError>
                  {errors.dateOfBirth.type === 'required' &&
                    'La fecha es requerida'}
                  {errors.dateOfBirth.type === 'pattern' &&
                    'El formato es incorrecto'}
                </MessageError>
              )}

              <div className="flex flex-col mb-2">
                <label className="font-bold">Numero</label>
                <input
                  type="number"
                  className="py-2 px-6 focus:outline-none rounded-xl mb-2"
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

              <div className="flex flex-col mb-2">
                <label className="font-bold">DNI</label>
                <input
                  type="number"
                  placeholder="Ingresar DNI"
                  className="py-2 px-6 focus:outline-none rounded-xl mb-2"
                  {...register('dni', {
                    required: true,
                    maxLength: 8,
                    minLength: 8,
                  })}
                />
              </div>
              {errors.dni && (
                <MessageError>
                  {errors.dni.type === 'required' && 'El DNI es requerido'}
                  {(errors.dni.type === 'maxLength' ||
                    errors.dni.type === 'minLength') &&
                    'El DNI debe tener 8 caracteres'}
                </MessageError>
              )}
              <div className="flex flex-col mb-2">
                <label className="font-bold">Email</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl"
                  {...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
              </div>
              {errors.email && (
                <MessageError>
                  {errors.email.type === 'required' && 'El email es requerido'}
                  {errors.email.type === 'pattern' && 'El email no es válido'}
                </MessageError>
              )}
              <button
                disabled={isLoading}
                type="submit"
                className="mt-4 bg-yellow-400 font-bold text-lg px-6 py-2 rounded-xl disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
              >
                Actualizar Cliente
              </button>
            </form>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default ModalPersonEdit;
