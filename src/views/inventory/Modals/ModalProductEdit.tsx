import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import MessageError from '@Components/molecules/MessageError';
import ModalBase from '@Modals/ModalBase';
import { ProductI, ProductResponseI, updateProduct } from '@Services/product';
import IconClose from '@Icons/IconClose';

interface Props {
  product: ProductResponseI;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onSuccess?: () => void;
}

const ModalProductEdit = ({ setIsOpen, isOpen, product, onSuccess }: Props) => {
  const { isLoading, mutate } = useMutation('updateProduct', updateProduct, {
    onSuccess: () => {
      reset();
      onSuccess && onSuccess();
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductI>({
    defaultValues: { ...product.attributes },
  });

  const onSubmit: SubmitHandler<ProductI> = (data) => {
    mutate({ idProduct: product.id, productData: data });
  };

  return (
    <>
      {isOpen && (
        <ModalBase className="bg-gray-700/60 backdrop-blur-sm flex justify-center items-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-4 font-bold text-white"
          >
            <IconClose className="w-8 h-8" />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-2xl max-w-xl rounded-2xl mx-auto px-8 pt-6 pb-8 mb-4 flex flex-col"
          >
            <section className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <MessageError>
                    {errors.name.type === 'required' &&
                      'El nombre es requerido'}
                  </MessageError>
                )}
              </div>

              <div className="w-full flex flex-col mb-3">
                <label className="font-bold mb-2">Código</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
                  {...register('code', { required: true })}
                />
                {errors.code && (
                  <MessageError>
                    {errors.code.type === 'required' &&
                      'El Código es requerido'}
                  </MessageError>
                )}
              </div>
            </section>
            <section className="grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col mb-3">
                <label className="font-bold mb-2">Cantidad</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
                  {...register('amount', { required: true })}
                />
                {errors.amount && (
                  <MessageError>
                    {errors.amount.type === 'required' &&
                      'El Cantidad es requerida'}
                  </MessageError>
                )}
              </div>
              <div className="w-full flex flex-col mb-3">
                <label className="font-bold mb-2">Precio</label>
                <input
                  type="text"
                  placeholder=""
                  className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1"
                  {...register('price', { required: true })}
                />
                {errors.price && (
                  <MessageError>
                    {errors.price.type === 'required' &&
                      'El Precio es requerido'}
                  </MessageError>
                )}
              </div>
            </section>
            <div className="flex flex-col">
              <label className="font-bold mb-2">Descripción</label>
              <textarea
                placeholder=""
                className="py-2 px-6 focus:outline-none rounded-xl border-1 border-gray-400 mb-1 resize-none"
                {...register('description', { required: true })}
              />
              {errors.description && (
                <MessageError>
                  {errors.description.type === 'required' &&
                    'La descripción es requerida'}
                </MessageError>
              )}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="mt-4 bg-yellow-400 hover:bg-yellow-300 font-bold text-lg px-6 py-2 rounded-xl disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
            >
              Actualizar producto
            </button>
          </form>
        </ModalBase>
      )}
    </>
  );
};

export default ModalProductEdit;
