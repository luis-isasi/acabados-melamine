import Image from 'next/image';
import { useRouter } from 'next/router';

import LoginForm from './components/LoginForm';
import useResponsive from '@Hooks/useResponsive';

const Login = () => {
  const router = useRouter();
  const isMobile = useResponsive({
    maxMediaQuery: 768,
  });

  const onSuccess = () => {
    const nextPage = router.query?.nextPage || '/home';
    router.push(`${nextPage}`);
  };

  return (
    <div className="min-h-screen h-auto w-full flex justify-center">
      <div
        style={{
          borderTopRightRadius: isMobile ? '0' : '150px',
        }}
        className="bg-gray-900 w-full md:w-80 lg:w-86 xl:w-94 2xl:w-102 flex items-center justify-center p-4"
      >
        <LoginForm onSuccess={onSuccess} />
      </div>
      <div className="hidden md:flex flex-grow bg-white rounded-2xl flex-col items-center justify-center">
        <figure className="relative -bottom-15">
          <Image
            layout="intrinsic"
            loader={({ src }) => `${src}`}
            src="/images/logo.svg"
            width={200}
            height={200}
            alt="logo"
          />
        </figure>
        <Image
          layout="intrinsic"
          loader={({ src }) => `${src}`}
          src="/images/picture-login.svg"
          width={600}
          height={600}
          alt="login-image"
        />
      </div>
    </div>
  );
};

export default Login;
