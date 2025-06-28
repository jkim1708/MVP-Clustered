"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type DateRangeContextType = {
    startDate: Date | null;
    setStartDate: (data: Date | null) => void;
    endDate: Date | null;
    setEndDate: (data: Date | null) => void;
};

const DataContext = createContext<DateRangeContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    return (
        <DataContext.Provider value={{startDate, setStartDate,endDate, setEndDate}}>
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