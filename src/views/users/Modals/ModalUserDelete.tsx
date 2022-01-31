import { useMutation } from 'react-query';

import IconClose from '@Icons/IconClose';
import ModalBase from '@Modals/ModalBase';
import { DataUserI } from '@Types/user';
import { deleteUser } from '@Services/auth';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  user: DataUserI;
  refetch: () => void;
}

const ModalUserDelete = ({ setIsOpen, isOpen, user, refetch }: Props) => {
  const { isLoading, mutate } = useMutation('deleteUser', deleteUser, {
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
          <div className="bg-white min-w-96 w-96 py-8 px-12 rounded-3xl">
            <h4 className="font-bold text-2xl text-center mb-10">
              ¿Seguro que deseas eliminar este usuario? 😕
            </h4>
            <div className="flex justify-center gap-6">
              <button
                type="button"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                onClick={() => {
                  mutate(user.id);
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

export default ModalUserDelete;
