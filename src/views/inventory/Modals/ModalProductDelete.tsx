import { useMutation } from 'react-query';

import IconClose from '@Icons/IconClose';
import ModalBase from '@Modals/ModalBase';
import { deleteProduct } from '@Services/product';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  idProduct: number;
  refetch: () => void;
}

const ModalProductDelete = ({
  setIsOpen,
  isOpen,
  idProduct,
  refetch,
}: Props) => {
  const { isLoading, mutate } = useMutation('deletePerson', deleteProduct, {
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });

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
          <div className="bg-white min-w-98 w-96 py-8 px-12 rounded-3xl">
            <h4 className="font-bold text-2xl text-center mb-10">
              ¿Seguro que deseas eliminar este Producto? 😕
            </h4>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                onClick={() => {
                  mutate(idProduct);
                }}
              >
                Eliminar
              </button>
              <button
                disabled={isLoading}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default ModalProductDelete;
