import { Region } from "../objects";
export interface WindowElement {
    type?: string;
    region?: Region;
    title?: string;
    value?: string;
    isFocused?: boolean;
    selectedText?: string;
    isEnabled?: boolean;
    role?: string;
    subRole?: string;
    children?: WindowElement[];
}
export interface WindowElementDescription {
    id?: string;
    role?: string;
    type?: string;
    title?: string | RegExp;
    value?: string | RegExp;
    selectedText?: string | RegExp;
}
