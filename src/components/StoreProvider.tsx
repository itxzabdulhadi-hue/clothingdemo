"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type StoreState = {
  items: CartItem[];
  wishlist: string[];
  recent: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "key">, opts?: { open?: boolean }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  pushRecent: (slug: string) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "mn.cart.v1";
const WISH_KEY = "mn.wishlist.v1";
const RECENT_KEY = "mn.recent.v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(read<CartItem[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setRecent(read<string[]>(RECENT_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent, hydrated]);

  useEffect(() => {
    const overlayOpen = cartOpen || searchOpen;
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  const addItem = useCallback<StoreState["addItem"]>((item, opts) => {
    const key = `${item.slug}__${item.size}__${item.color}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(i.quantity + item.quantity, 20) } : i,
        );
      }
      return [...prev, { ...item, key }];
    });
    if (opts?.open !== false) setCartOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(quantity, 20) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const pushRecent = useCallback((slug: string) => {
    setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 8));
  }, []);

  const value = useMemo<StoreState>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.quantity * i.price, 0);
    return {
      items,
      wishlist,
      recent,
      cartOpen,
      searchOpen,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted: (slug: string) => wishlist.includes(slug),
      pushRecent,
      setCartOpen,
      setSearchOpen,
    };
  }, [
    items,
    wishlist,
    recent,
    cartOpen,
    searchOpen,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    toggleWishlist,
    pushRecent,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
