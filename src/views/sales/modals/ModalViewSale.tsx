import ModalBase from '@Modals/ModalBase';
import IconClose from '@Icons/IconClose';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  sale: any;
}

const ModalNewSale = ({ setIsOpen, sale }: Props) => {
  console.log({ sale });

  return (
    <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="absolute top-5 right-4 font-bold text-white"
      >
        <IconClose className="w-8 h-8" />
      </button>
    </ModalBase>
  );
};

export default ModalNewSale;
