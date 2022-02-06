import ModalBase from '@Modals/ModalBase';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const ModalPersonSuccess = ({ setIsOpen, isOpen }: Props) => {
  return (
    <>
      {isOpen && (
        <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-2xl h-44 p-5 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mb-5">
              Usuario añadido correctamente 🎉
            </p>
            <button
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl "
              type="button"
              onClick={() => setIsOpen(false)}
            >
              OKEY
            </button>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default ModalPersonSuccess;
