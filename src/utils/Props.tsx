import { ReactNode } from "react";
import { User } from "../models/User";

export interface Organization {
  id: string;
  name: string;
  status: number;
  userId: string;
  image: string;
  title: string;
  description: string;
  email: string;
  address: string;
  createUtcAt: string;
  googleReview: string;
}

export interface OrganizationContextType {
  organization: Organization | null;
  setOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
}

export interface OrganizationContextProviderProps {
  children: ReactNode;
}

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

interface ProductOptionsProps {
  name: string;
  price: number;
}

export interface PopupProps {
  dish: Dish;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
  productOptions?: ProductOptionsProps[];
}

export interface DishesCardProps {
  id?: string;
  title?: string;
  img?: string;
  description?: string;
  price?: number;
  productOptions: ProductOptionsProps[]; // Add this prop
}

// Define the type for a single cart item
export interface CartItem {
  title: string;
  price: number;
  quantity: number;
  img: string;
}

// Define the props type for CartPopup
export interface CartPopupProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose: () => void;
}
