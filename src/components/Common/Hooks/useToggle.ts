import { useState } from 'react';

const useToggle = (initialValue = false):{toggleValue: boolean, toggle:() => void }=> {
  const [toggleValue, setToggleValue] = useState<boolean>(initialValue);

  const toggle = () => {
    setToggleValue((prevValue) => !prevValue);
  };

  return {toggleValue, toggle}
};

export default useToggle;
