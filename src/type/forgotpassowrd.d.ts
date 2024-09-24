export interface InputFieldProps {
    name: string;
    type?: string;
    placeholder: string;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string | undefined };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
}