import { useState } from 'react';
import { useQuery } from 'react-query';

import IconSearch from '@Icons/IconSearch';
import { getAllProducts, SaleProductI } from '@Services/product';
import ProductList from './components/ProductList';
import ModalBase from '@Modals/ModalBase';
import IconClose from '@Icons/IconClose';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  setItems: (items: SaleProductI[]) => void;
  items: SaleProductI[];
}

const ModalAddItem = ({ setIsOpen, setItems, items }: Props) => {
  const [textName, setTextName] = useState<string>('');

  const { data, isLoading } = useQuery('getAllProducts', getAllProducts);

  return (
    <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white p-5 rounded-2xl mx-auto max-w-screen-2xl">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-4 font-bold text-white"
        >
          <IconClose className="w-8 h-8 text-black" />
        </button>
        <div>
          <h4 className="font-bold text-4xl mb-4">Lista de productos</h4>
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
          {isLoading && (
            <div className="font-bold text-2xl flex justify-center items-center gap-4">
              <div className="loader w-5 h-5" />
              <p> Cargando Productos...</p>
            </div>
          )}
          {data && !isLoading && (
            <ProductList
              products={data}
              textName={textName}
              items={items}
              setItems={setItems}
            />
          )}
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalAddItem;
