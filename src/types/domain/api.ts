export interface PAGE_LINK {
  href: string;
  label: string;
}

export interface FooterProps {
  product: Product;
  isMobile: boolean;
}

export interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

// Import Product type for FooterProps and AddToCartButtonProps
import type { Product } from './product';
