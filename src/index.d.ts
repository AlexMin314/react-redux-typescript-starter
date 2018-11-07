// Externals
declare module "ramda";
declare module "react-redux";

// file related
declare module "*.json";

// Image related
declare module "*.ico";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.gif";

// Font
declare module "*.woff";

// Routes
interface Match {
  params: string;
  isExact: string;
  path: string;
  url: string;
}

// utility
interface Dynamic {
  [key: string]: any;
}

type valueof<T> = T[keyof T];

// redux
declare module "redux-thunk" {
  import { Store, Action, Dispatch } from "redux";
  import { ApplicationState } from "@/App/store/_rootReducer";

  interface StoreAPIs {
    dispatch: Dispatch<any>;
    getState: () => ApplicationState;
    payload?: any;
  }

  export interface ThunkPiped {
    (storeAPIs: StoreAPIs): void;
  }

  export interface ThunkAction {
    (p?: any): (
      dispatch: Dispatch<any>,
      getState: () => ApplicationState,
      payload?: any
    ) => void;
  }
}
