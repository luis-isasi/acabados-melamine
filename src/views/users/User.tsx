import IconSearch from '@Icons/IconSearch';
import FormUserRegister from './components/FormUserRegister';
import { useQuery } from 'react-query';
import { getAllUsers } from '@Services/auth';
import UserItem from './components/UserItem';
import { useContextAuth } from '@Context/contextAuth';
import { useState } from 'react';

const Usuario = () => {
  const { user } = useContextAuth();
  const [textName, setTextName] = useState<string>('');
  const { data, isLoading, isError, refetch } = useQuery('users', getAllUsers);

  const renderUsers = () => {
    const users = data
      .filter((_user) => _user.id !== user.user.id)
      .filter((_user) => _user.username.startsWith(textName));

    if (users.length === 0 && textName) {
      return (
        <p className="font-bold text-center text-3xl mt-10">
          No hay resultados 😥
        </p>
      );
    }

    return users.map((user) => {
      return <UserItem key={user.id} user={user} refetch={refetch} />;
    });
  };

  const onSuccessAddUser = () => {
    refetch();
  };

  return (
    <div
      className="grid h-full w-full grid-cols-1 gap-4"
      style={{
        gridTemplateColumns: '2fr 1fr',
      }}
    >
      {isLoading && <div>Cargando...</div>}
      {isError && <div>Error 😥</div>}
      {data && !isLoading && !isError && (
        <div className="">
          <form className="mb-5">
            <div className="bg-gray-100 py-2 px-3 rounded-xl ">
              <div className="bg-white p-2 rounded-xl border-1 border-gray-300 flex items-center ">
                <IconSearch className="text-gray-400 w-5 h-5" />
                <input
                  value={textName}
                  onChange={(e) => setTextName(e.target.value)}
                  className="flex-1 py-1 px-6 focus:outline-none"
                  type="text"
                  placeholder="Buscar por nombre"
                />
              </div>
            </div>
          </form>
          <section className="flex flex-col">
            <header className="bg-gray-100 font-bold py-2 rounded-xl flex justify-around">
              <span>Nombres</span>
              <span>Correo</span>
              <span>DNI</span>
              <span>Acciones</span>
            </header>
            {renderUsers()}
          </section>
        </div>
      )}
      <FormUserRegister onSuccess={onSuccessAddUser} />
    </div>
  );
};

export default Usuario;
