import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';
import IconSearch from '@Icons/IconSearch';
import FormUserRegister from './components/FormUserRegister';
import { useQuery } from 'react-query';

const Usuario = () => {
  // const {} = useQuery('users', async () => {})

  return (
    <div
      className="grid h-full w-full grid-cols-1 gap-4"
      style={{
        gridTemplateColumns: '2fr 1fr',
      }}
    >
      <div className="">
        <form className="mb-5">
          <div className="bg-gray-100 py-2 px-3 rounded-xl ">
            <div className="bg-white p-2 rounded-xl border-1 border-gray-300 flex items-center ">
              <IconSearch className="text-gray-400" />
              <input
                className="flex-1 py-1 px-7 focus:outline-none"
                type="text"
                placeholder="Buscar por..."
              />
            </div>
          </div>
        </form>
        <section className="flex flex-col">
          <header className="bg-gray-100 font-bold py-2 rounded-xl flex justify-around">
            <span>Nombre</span>
            <span>Correo</span>
            <span>Usuario</span>
            <span>Acciones</span>
          </header>
          <div
            className="bg-white py-3 border-b border-gray-300 grid  text-center"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
            }}
          >
            <span>Sonia Condori Guillermo</span>
            <span>sonia_0996@hotmail.com</span>
            <span>Seos0996</span>
            <div className="flex justify-between px-16">
              <button type="button">
                <IconEdit className="text-blue-600" />
              </button>

              <button type="button">
                <IconDelete className="text-red-500" />
              </button>
            </div>
          </div>
          <div
            className="bg-white py-3 border-b border-gray-300 grid  text-center"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
            }}
          >
            <span>Karla Camila Delgado</span>
            <span>karlita_uwu@hotmail.com</span>
            <span>Karla123</span>
            <div className="flex justify-between px-16">
              <button type="button">
                <IconEdit className="text-blue-600" />
              </button>

              <button type="button">
                <IconDelete className="text-red-500" />
              </button>
            </div>
          </div>
        </section>
      </div>
      <FormUserRegister />
    </div>
  );
};

export default Usuario;
