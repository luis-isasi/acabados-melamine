import IconDelete from '@Icons/IconDelete';
import IconEdit from '@Icons/IconEdit';
import { ProductResponseI } from '@Services/product';
import { useState } from 'react';
import ModalProductDelete from '../Modals/ModalProductDelete';
import ModalProductEdit from '../Modals/ModalProductEdit';

interface Props {
  isPar: boolean;
  product: ProductResponseI;
  refetch: () => void;
}

const ProductoItem = ({ isPar, product, refetch }: Props) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  return (
    <>
      <ModalProductEdit
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        product={product}
        refetch={refetch}
      />
      <ModalProductDelete
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        idProduct={product.id}
        refetch={refetch}
      />
      <li
        className={`${
          isPar && 'bg-gray-100'
        } grid grid-cols-6 py-2 border-b items-center border-gray-200`}
      >
        <span>{product.attributes.name}</span>
        <span>{product.attributes.code}</span>
        <span>{product.attributes.amount}</span>
        <span>{product.attributes.price}</span>
        <span>{product.attributes.description}</span>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setIsOpenEdit(true)} type="button">
            <IconEdit className="text-blue-600" />
          </button>
          <button onClick={() => setIsOpenDelete(true)} type="button">
            <IconDelete className="text-red-500" />
          </button>
        </div>
      </li>
    </>
  );
};

export default ProductoItem;
