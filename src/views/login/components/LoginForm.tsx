import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import IconVisibility from '@Icons/IconVisibility';
import IconVisibilityOff from '@Icons/IconVisibilityOff';
import IconUser from '@Icons/IconUser';
import IconPassword from '@Icons/IconPassword';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <span className="text-red-600 font-medium text-sm">
            {errors.email.type === 'required' && 'El email es requerido'}
            {errors.email.type === 'pattern' && 'El email no es válido'}
          </span>
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
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <IconVisibilityOff className="w-5 h-5" />
            ) : (
              <IconVisibility className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-600 font-medium text-sm">
            {errors.password.type === 'required' &&
              'La contraseña es requerida'}
            {errors.password.type === 'minLength' &&
              'La contraseña debe tener al menos 6 caracteres'}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-400 text-white rounded-md px-4 py-2"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
