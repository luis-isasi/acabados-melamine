import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import IconVisibility from '@Icons/IconVisibility';
import IconVisibilityOff from '@Icons/IconVisibilityOff';
import { register as registerUser } from '@Services/auth';
import { RegisterDataI } from '@Types/user';
import MessageError from '@Components/molecules/MessageError';

interface Props {
  onSuccess?: () => void;
}

const FormUserRegister = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useMutation('registeUser', registerUser, {
    onSuccess: () => {
      reset();
      onSuccess();
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <div>
      <h4 className="mb-20 font-bold text-xl">Nuevo Usuario</h4>
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
            {errors.dateOfBirth.type === 'required' && 'La fecha es requerida'}
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
          <label className="font-bold">Ingresar DNI</label>
          <input
            type="number"
            placeholder="Ingresar DNI"
            className="py-2 px-6 focus:outline-none rounded-xl mb-2"
            {...register('dni', { required: true, maxLength: 8, minLength: 8 })}
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
        <div className="flex flex-col mb-2">
          <label className="font-bold">Password</label>
          <div className="flex items-center bg-white rounded-xl h-11 px-4">
            <input
              type={showPassword ? 'text' : 'password'}
              className="flex-grow h-full px-2 focus:outline-none font-semibold"
              placeholder="Contraseña"
              {...register('password', { required: true, minLength: 6 })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IconVisibilityOff className="w-5 h-5" />
              ) : (
                <IconVisibility className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <MessageError>
            {errors.password.type === 'required' &&
              'La contraseña es requerida'}
            {errors.password.type === 'minLength' &&
              'La contraseña debe tener al menos 6 caracteres'}
          </MessageError>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="mt-4 bg-yellow-400 font-bold text-lg px-6 py-2 rounded-xl disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
        >
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default FormUserRegister;
