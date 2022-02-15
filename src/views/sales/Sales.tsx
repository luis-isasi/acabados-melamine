import { useState } from 'react';
import { useQuery } from 'react-query';

import IconSearch from '@Icons/IconSearch';
import SaleList from './components/SaleList';
import ModalNewSale from './modals/ModalNewSale/ModalNewSale';
import { getAllSales } from '@Services/sale';

const Sales = () => {
  const [textName, setTextName] = useState<string>('');
  const [isOpenModalNewSale, setIsOpenModalNewSale] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery('getAllSales', getAllSales);

  const onSusccessRegisterSale = () => {
    refetch();
  };

  return (
    <>
      {isOpenModalNewSale && <ModalNewSale setIsOpen={setIsOpenModalNewSale} />}
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-5">
          <h4 className="font-bold text-4xl">Registro de </h4>
        </div>
        <div>
          <h4 className="font-bold text-4xl mb-4">Lista de Ventas</h4>
          <div className="flex items-center gap-x-8 mb-5 ">
            <form className="flex-grow">
              <div className="bg-gray-100 py-2 px-3 rounded-xl ">
                <div className="bg-white p-2 rounded-xl border-1 border-gray-300 flex items-center">
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
            <button
              type="button"
              onClick={() => setIsOpenModalNewSale(true)}
              className="bg-blue-500 hover:bg-blue-700 h-10 text-white font-bold px-4 rounded-full "
            >
              Agregar Venta
            </button>
          </div>
          {isLoading && (
            <div className="font-bold text-2xl flex justify-center items-center gap-4">
              <div className="loader w-5 h-5" />
              <p> Cargando Ventas...</p>
            </div>
          )}
          {data && !isLoading && (
            <SaleList
              sales={data.data as any[]}
              textName={textName}
              refetch={refetch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sales;
