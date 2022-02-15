import { useState } from 'react';

import { ProductResponseI, SaleProductI } from '@Services/product';
import ModalBase from '@Modals/ModalBase';
import { SubmitHandler, useForm } from 'react-hook-form';
import MessageError from '@Components/molecules/MessageError';
import IconClose from '@Icons/IconClose';

interface Props {
  isPar: boolean;
  product: ProductResponseI;
  setItems: (items: SaleProductI[]) => void;
  items: SaleProductI[];
}

const ProductoItem = ({ isPar, product, setItems, items }: Props) => {
  const [isOpenAddItem, setIsOpenAddItem] = useState<boolean>(false);

  return (
    <>
      {isOpenAddItem && (
        <ModalItemAmount
          setIsOpen={setIsOpenAddItem}
          maxAmount={product.attributes.amount}
          setItems={setItems}
          product={product}
          items={items}
        />
      )}
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
        <div>
          <button
            onClick={() => setIsOpenAddItem(true)}
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar
          </button>
        </div>
      </li>
    </>
  );
};

interface PropsModalItemAmount {
  setIsOpen: (isOpen: boolean) => void;
  maxAmount: number;
  product: ProductResponseI;
  setItems: (items: SaleProductI[]) => void;
  items: SaleProductI[];
}

const ModalItemAmount = ({
  setIsOpen,
  maxAmount,
  setItems,
  items,
  product,
}: PropsModalItemAmount) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ amount: number }>();

  const onSubmit: SubmitHandler<{ amount: number }> = ({ amount }) => {
    setItems([...items, { ...product.attributes, saleAmount: amount }]);
    setIsOpen(false);
  };

  return (
    <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white p-7 min-h-84 rounded-2xl flex flex-col justify-center max-w-94 mx-auto"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-4 font-bold text-white"
        >
          <IconClose className="w-8 h-8 text-black" />
        </button>
        <h4 className="text-2xl font-bold text-center mb-5">
          Ingresa la cantidad
        </h4>
        <div className="flex flex-col mb-5">
          <label className="font-bold mb-2">Cantidad</label>
          <input
            type="number"
            placeholder=""
            className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
            {...register('amount', {
              required: true,
              maxLength: Number(maxAmount),
              minLength: 0,
              validate: {
                validateAmount: (value) =>
                  Number(value) >= 0 && Number(value) <= Number(maxAmount),
              },
            })}
          />
          {errors.amount && (
            <MessageError>
              {errors.amount.type === 'required' && 'La cantidad es requerido'}
              {errors.amount.type === 'validateAmount' &&
                'La cantidad debe ser mayor a 0 y menor a ' + maxAmount}
            </MessageError>
          )}
        </div>
        <button
          type="submit"
          className="max-w-max bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-2xl mx-auto"
        >
          Validad y agregar
        </button>
      </form>
    </ModalBase>
  );
};

export default ProductoItem;
