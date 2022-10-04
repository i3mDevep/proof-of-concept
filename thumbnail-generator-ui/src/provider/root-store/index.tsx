import { createContext, FC, useContext, useState } from "react";
import { RootStore } from "../../store/root.store";

interface Props {
  children?: React.ReactNode;
}

const rootStoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider: FC<Props> = ({ children }) => {
  const [rootStore] = useState(() => new RootStore());

  return (
    <rootStoreContext.Provider value={rootStore}>
      {children}
    </rootStoreContext.Provider>
  );
};

export function useRootStore() {
  const ctx = useContext(rootStoreContext);
  if (!ctx) throw new Error("useRootStore undefine");
  return ctx;
}
