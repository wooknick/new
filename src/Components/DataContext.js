import { createContext } from "react";

const DataContext = createContext({ color: "red", setColor: () => {} });

export default DataContext;
