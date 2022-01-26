import { ReactChild } from 'react';
declare const CartContext: any;
declare type ContextProviderProps = {
    children: ReactChild;
};
declare const CartProvider: ({ children }: ContextProviderProps) => JSX.Element;
export { CartProvider, CartContext };
