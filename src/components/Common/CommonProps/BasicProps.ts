import * as React from "react";
import { ClickableProps } from "@components/Common/CommonProps/ClickableProps";

export interface BasicProps extends ClickableProps {
    id?: string;
    style?: Object;
    hideElement?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}