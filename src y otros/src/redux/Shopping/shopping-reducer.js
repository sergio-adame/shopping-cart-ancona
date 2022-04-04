import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "CLUTCH NISSAN TSURU III",
      description:
        "KIT CLUTCH NISSAN TSURU III 92-17 TSUBAME 93-04 SENTRA 1.6L SKU: FKC-619084667 BRAND LUK",
      price: 36.3,
      image:
        "https://ancona.s3.us-east-2.amazonaws.com/products_thumbs/6190846670.jpg",
    },
    {
      id: 2,
      title: "Fuel line tube",
      description:
        "FUEL LINE TUBE 3/8 9.5MM 15.24M ROLL (600IN) PRICE PER METER SKU: MRA-80064 BRAND DAYKO",
      price: 2.6,
      image:
        "https://ancona.s3.us-east-2.amazonaws.com/products/MRA-80064-BWEB.PNG",
    },
    {
      id: 3,
      title: "AVEO BATTERY",
      description:
        "BATTERY AVEO CRUZE SONIC TIIDA PLATINA GOL VENTO JETTA SKU:EAC-MBXTM85550 BRAND MOTORCRAFT",
      price: 125.0,
      image:
        "https://ancona.s3.us-east-2.amazonaws.com/products/EAC-MBXTM85550-BWEB.PNG",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
