"use client"

import { CalendarIcon } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {useDataContext} from "@/context/DataContext";

export default function DateRangePicker() {
    const {startDate, setStartDate} = useDataContext();
    const {endDate, setEndDate} = useDataContext();


    const CustomRangeInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
        <Button
            variant="outline"
            className="justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 min-w-[200px]"
            onClick={onClick}
        >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {value || "Select date range"}
        </Button>
    )

    return (
        // <div className="min-h-screen w-full relative overflow-hidden">
        <div className="w-full mt-70 mb-1">
        {/*<div className="">*/}
            {/* Fluid Blue Background */}
            <div
                // className="absolute inset-0 bg-cover bg-center bg-no-repeat"

            />

            {/* Custom DatePicker Styles */}
            <style jsx global>{`
        .react-datepicker {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          font-family: inherit;
        }
        
        .react-datepicker__day--in-selecting-range,
        .react-datepicker__day--in-range {
          background-color: #dbeafe !important;
          color: #1d4ed8 !important;
        }
        
        .react-datepicker__day--range-start,
        .react-datepicker__day--range-end {
          background-color: #2563eb !important;
          color: white !important;
        }
      `}</style>

            {/* Overlay for depth */}
            {/*<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-black/30" />*/}
            <div className="" />

            {/* Content Container */}
            {/*<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-6">*/}
            <div className=" flex flex-col items-center">
                {/* Date Range Selector Header */}
                <div className="w-full max-w-4xl">
                    {/*<Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-lg">*/}
                    <Card className="bg-white/95 border-white/20 shadow-lg">
                        <CardContent className="p-4">
                            {/*<div className="flex items-center justify-between">*/}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-lg font-semibold text-gray-900">Date Range Analysis</h2>
                                    <div className="h-4 w-px bg-gray-300 z-100" />
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(dates) => {
                                            const [start, end] = dates as [Date | null, Date | null]
                                            setStartDate(start!)
                                            setEndDate(end)
                                        }}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        customInput={<CustomRangeInput />}
                                        dateFormat="MMM dd, yyyy"
                                        showPopperArrow={false}
                                        popperClassName="datepicker-popper"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white border-gray-200 hover:bg-gray-50"
                                        onClick={() => {
                                            const today = new Date()
                                            const lastWeek = new Date()
                                            lastWeek.setDate(today.getDate() - 7)
                                            setStartDate(lastWeek)
                                            setEndDate(today)
                                        }}
                                    >
                                        Last 7 Days
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white border-gray-200 hover:bg-gray-50"
                                        onClick={() => {
                                            const today = new Date()
                                            const lastMonth = new Date()
                                            lastMonth.setDate(today.getDate() - 30)
                                            setStartDate(lastMonth)
                                            setEndDate(today)
                                        }}
                                    >
                                        Last 30 Days
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart display would go here */}
                {/*<div className="w-full max-w-4xl">*/}
                {/*    <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">*/}
                {/*        <CardContent className="p-8">*/}
                {/*            <div className="text-center py-12">*/}
                {/*                <h3 className="text-lg font-semibold text-gray-900 mb-2">Date Range Selected</h3>*/}
                {/*                <p className="text-gray-600">*/}
                {/*                    {startDate && endDate*/}
                {/*                        ? `${format(startDate, "MMM dd, yyyy")} - ${format(endDate, "MMM dd, yyyy")}`*/}
                {/*                        : startDate*/}
                {/*                            ? `From ${format(startDate, "MMM dd, yyyy")}`*/}
                {/*                            : "Select a date range"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
