import { useState } from 'react';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import { login } from '@Services/auth';
import IconVisibility from '@Icons/IconVisibility';
import IconVisibilityOff from '@Icons/IconVisibilityOff';
import IconUser from '@Icons/IconUser';
import IconPassword from '@Icons/IconPassword';
import { useContextAuth } from '@Context/contextAuth';
import MessageError from './MessageError';

interface Inputs {
  email: string;
  password: string;
}

interface Props {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: Props) => {
  const { setDataUserLocalStorage } = useContextAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { data, isLoading, isError, mutate } = useMutation('login', login, {
    onSuccess: (data) => {
      if (!data.error && data.user) {
        setDataUserLocalStorage(data);
        onSuccess();
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      className="flex flex-col w-full max-w-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 text-center text-white">
        <p className="text-4xl font-bold mb-4">Inicia Sesión</p>
        <span className="text-lg">¡Bienvenido! Ingresa tu información</span>
      </div>
      <div className="mb-5">
        <div className="flex items-center bg-white border border-gray-600 rounded-md h-11 px-2">
          <IconUser className="w-5 h-5" />
          <input
            className="flex-grow h-full px-2 focus:outline-none font-semibold"
            placeholder="Usuario"
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
      </div>
      <div className="mb-5">
        <div className="flex items-center bg-white border border-gray-600 rounded-md h-11 px-2">
          <IconPassword className="w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="flex-grow h-full px-2 focus:outline-none font-semibold"
            placeholder="Contraseña"
            {...register('password', { required: true, minLength: 6 })}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <IconVisibilityOff className="w-5 h-5" />
            ) : (
              <IconVisibility className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <MessageError>
            {errors.password.type === 'required' &&
              'La contraseña es requerida'}
            {errors.password.type === 'minLength' &&
              'La contraseña debe tener al menos 6 caracteres'}
          </MessageError>
        )}
      </div>
      {(data?.error || data?.message) && (
        <MessageError>
          {data?.error?.message || data?.message[0]?.messages[0].message}
        </MessageError>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-500 mt-3 hover:bg-green-400 disabled:bg-gray-500 disabled:cursor-wait text-white rounded-md px-4 py-2"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
