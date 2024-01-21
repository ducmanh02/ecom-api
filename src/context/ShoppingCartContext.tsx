import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { fetchCategory, fetchProducts } from "../api/api";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  id: number;
  quantity: number;
};
type Product={
  id: number,
  title: string,
  price: number,
  description: string,
  images: string[],
  category:{
    id: number,
    name: string,
    image: string,
  }
}

type Category ={
  id: number,
  name: string
}
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItem: CartItem[];
  dataP: Product[] | undefined,
  dataC: Category[] | undefined,
  isLoadingP: boolean,
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // product
  const [dataP, setDataP] = useState();
  const [dataC, setDataC] = useState();

  const [isLoadingP, setLoadingP] = useState(false);


  useEffect(()=>{
    setLoadingP(true);
    const fetchProductFromApi = async() =>{
      try{
        const result = await fetchProducts();
        
        setDataP(result);
      }
      catch(error){
        console.log(error)
      }
    }

    const fetchCategoryFromApi = async() =>{
      try{
        const result = await fetchCategory();
        setDataC(result);
        console.log(result)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchProductFromApi();
    fetchCategoryFromApi();
    setLoadingP(false)
  },[])


  const [cartItem, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpened, setIsOpened] = useState(false);

  const openCart = () => {
    setIsOpened(true);
  };
  const closeCart = () => {
    setIsOpened(false);
  };
  //tong so luong san pham trong gio hang
  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        isLoadingP,
        dataP,
        dataC,
        openCart,
        closeCart,
        cartQuantity,
        cartItem,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
    <ShoppingCart isOpened={isOpened}/>
      {children}
    </ShoppingCartContext.Provider>
  );
}
