import { formatAmount } from '@Utils';
import { useState } from 'react';
import ModalViewSale from '../modals/ModalViewSale';

interface Props {
  isPar: boolean;
  sale: any;
}

const SaleItem = ({ isPar, sale }: Props) => {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);
  return (
    <>
      {isOpenModal && <ModalViewSale setIsOpen={setisOpenModal} sale={sale} />}
      <li
        className={`${
          isPar && 'bg-gray-100'
        } grid grid-cols-4 py-2 border-b items-center border-gray-200`}
      >
        <span>{sale?.attributes?.clientName}</span>
        <span>{sale?.attributes?.date}</span>
        <span>{sale?.attributes?.dni}</span>
        <span className="font-semibold">
          {formatAmount({ amount: sale?.attributes?.total })}
        </span>
      </li>
    </>
  );
};

export default SaleItem;
