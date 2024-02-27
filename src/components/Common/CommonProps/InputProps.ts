import { BasicProps } from "@components/Common/CommonProps/BasicProps";

export interface InputProps extends BasicProps {
    onChange?: (event: any) => void;
    placeholder?: string;
}