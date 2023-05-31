import { useState } from "react";

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<Boolean>(true);
    const [rightIcon, setRightIcon] = useState<string>('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    };
};