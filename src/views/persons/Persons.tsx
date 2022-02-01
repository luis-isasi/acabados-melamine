import Image from 'next/image';

import IconSearch from '@Icons/IconSearch';
import FormPersonRegister from './components/FormPersonRegister';
import { useQuery } from 'react-query';
import { getAllPersons } from '@Services/person';
import PersonItem from './components/PersonItem';
import { useContextAuth } from '@Context/contextAuth';
import { useState } from 'react';

const Persons = () => {
  const { user } = useContextAuth();
  const [textName, setTextName] = useState<string>('');
  const { data, isLoading, isError, refetch } = useQuery(
    'getAllPersons',
    getAllPersons
  );

  const renderUsers = () => {
    const persons = data.data
      .filter((_user) => _user.id !== user.user.id)
      .filter((_user) => _user.attributes.username.startsWith(textName));

    if (persons.length === 0 && textName) {
      return (
        <p className="font-bold text-center text-3xl mt-10">
          No hay resultados 😥
        </p>
      );
    }

    return persons.map((person) => {
      return <PersonItem key={person.id} person={person} refetch={refetch} />;
    });
  };

  const onSuccessAddUser = () => {
    refetch();
  };

  return (
    <div
      className="grid h-full w-full grid-cols-1 gap-4"
      style={{
        gridTemplateColumns: '1fr 2fr',
      }}
    >
      <FormPersonRegister onSuccess={onSuccessAddUser} />
      {isLoading && <div>Cargando...</div>}
      {isError && <div>Error 😥</div>}
      {data && !isLoading && !isError && (
        <section className="relative">
          <header className="flex justify-between items-center">
            <h3 className="text-5xl font-bold">Buscar cliente:</h3>
            <Image
              layout="intrinsic"
              loader={({ src }) => `${src}`}
              src={'/images/person_undraw.png'}
              width={200}
              height={200}
              alt="client-image"
              className="absolute right-0 z-10"
            />
          </header>
          <div
            className="bg-white px-5 py-10 rounded-2xl relative -top-10"
            style={{
              boxShadow: '0px 0px 40px rgba(29, 26, 26, 0.1)',
            }}
          >
            <form className="mb-5 ">
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
                <span>Celular</span>
                <span>Acciones</span>
              </header>
              {renderUsers()}
            </section>
          </div>
        </section>
      )}
    </div>
  );
};

export default Persons;
