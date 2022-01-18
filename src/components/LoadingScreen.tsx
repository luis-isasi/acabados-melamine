import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="bg-gray-900 z-50 max-h-screen w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center ">
      <Image
        loader={({ src }) => `${src}`}
        src="/images/logo.svg"
        width={250}
        height={150}
        alt="loading-acabados-melamine"
      />
      <p className="text-white text-3xl font-bold mt-4">Cargando...👋</p>
    </div>
  );
};

export default LoadingScreen;
