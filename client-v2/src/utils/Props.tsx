import { Dispatch, ReactNode, SetStateAction } from "react";
import { User } from "../models/User";

export interface AuthContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (
    user: User
  ) => Promise<{ status: boolean; message: string } | undefined>;
  signOut: () => boolean;
  signUp: (
    user: User
  ) => Promise<{ status: boolean; message: string } | undefined>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface ReactHotToastProps {
  message: string;
  type: "success" | "error" | "loading" | "blank";
}

export interface DecodedTokenProps {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  username: string;
}

export interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

export interface SignInProps {
  onClose: () => void;
  switchToRegister?: () => void;
}

export interface RegisterProps {
  onClose: () => void;
  switchToSignIn?: () => void;
}

export interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  onResendOTP: () => void;
}

export interface Dish {
  id: string;
  title: string;
  img: string;
  description: string;
  price: number;
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface PopupProps {
  dish: Dish;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
}

export interface DishesCardProps {
  id?: string;
  title?: string;
  img?: string;
  description?: string;
  price?: number;
}
