import { useState, useEffect } from 'react';
import { MediaQuery } from 'src/types/mediaQuery';

interface Parameters {
  minMediaQuery?: MediaQuery;
  maxMediaQuery?: MediaQuery;
}

const useResponsive = ({
  minMediaQuery = undefined,
  maxMediaQuery = undefined,
}: Parameters) => {
  const [isScreen, setIsScreen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    validateDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', validateDimensions);

    return () => {
      window.removeEventListener('resize', validateDimensions);
    };
  }, []);

  const validateDimensions = () => {
    let widthScreen: number = window.innerWidth;

    let screen;

    if (minMediaQuery && !maxMediaQuery) {
      screen = widthScreen > minMediaQuery;
    }

    if (maxMediaQuery && !minMediaQuery) {
      screen = widthScreen < maxMediaQuery;
    }

    if (minMediaQuery && maxMediaQuery) {
      screen = widthScreen > minMediaQuery && widthScreen < maxMediaQuery;
    }

    isScreen !== screen && setIsScreen(screen);
  };

  return isScreen;
};

export default useResponsive;
