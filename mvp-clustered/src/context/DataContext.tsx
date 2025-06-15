"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { DataPoint } from "@/app/page";

type DataContextType = {
    data: DataPoint[];
    setData: (data: DataPoint[]) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<DataPoint[]>([]);
    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
}