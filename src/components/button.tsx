import React,{ ComponentProps,ElementType} from 'react'
type ButtonOwnProps<E extends ElementType = typeof defaultElement> = {
children?: string;
primary?: boolean;
secondary?: boolean;
as?:  E;
className: string;
placeholder?:string;

onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void,
onChange?: E extends 'input' ? (event:React.ChangeEvent<HTMLInputElement>) => void : never;
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &  Omit<ComponentProps<E>,keyof ButtonOwnProps>;
const defaultElement = 'button';
const Button = <E extends ElementType = typeof defaultElement>({as,secondary,primary,children,className,...otherProps}:ButtonProps<E>) => {
    

   
    const TagName = as || defaultElement;
    
    
    return <TagName className={className} {...otherProps}>{children}</TagName>
    
       
    
 }
 export default Button