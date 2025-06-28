"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, X } from "lucide-react"
import Papa from "papaparse";
import {useRouter} from "next/navigation";

export default function Component() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    // const [setData] = useState(); // Assuming you have a DataContext to set the data

    const handleFileSelect = (file: File) => {
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
            setSelectedFile(file)
        } else {
            alert("Please select a CSV file")
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFileSelect(files[0])
        }
    }

    const removeFile = () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!selectedFile) return



        const file = event;

        console.log("Selected file:", file);

        let errors: string[] = [];
        if (selectedFile) {
            Papa.parse(selectedFile, {
                header: true, // Falls die CSV eine Kopfzeile hat
                skipEmptyLines: true,
                complete: (result) => {
                    console.log('CSV parsing resultt:', result);
                    errors = result.errors.map(error => error.message);
                    // setData(result.data as DataPoint[]); // Geparste Daten speichern

                },
            });
        }

        if( errors.length > 0) {
            console.log("errors", errors);
            setErrorMessage(errors.join(", "));
            return;
        } else {
            router.push(`/`);
        }

        //set router next page
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Fluid Blue Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-black">
                {/* Animated fluid overlay */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 via-blue-500/30 to-purple-600/20"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-bounce"></div>
                    <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                    <CardContent className="p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload CSV File</h1>
                            <p className="text-gray-600 text-sm">Select or drag and drop your CSV file to get started</p>
                            {errorMessage && (
                                <p className="text-red-500 text-xs mt-2">Error: {errorMessage}</p>
                            )}
                        </div>

                        {/* File Upload Area */}
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                                isDragOver
                                    ? "border-blue-500 bg-blue-50"
                                    : selectedFile
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileInputChange} className="hidden" />

                            {selectedFile ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center space-x-2">
                                        <FileText className="h-8 w-8 text-green-600" />
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                                            <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeFile()
                                            }}
                                            className="ml-2"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                                    <div>
                                        <p className="text-gray-600 font-medium">Click to select or drag and drop</p>
                                        <p className="text-sm text-gray-500 mt-1">CSV files only</p>


                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        {selectedFile && (
                            <div className="button-container">
                                <Button onClick={handleUpload} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Upload CSV File
                                </Button>
                            </div>
                        )}

                        {/* File Requirements */}
                        <div className="mt-6 text-xs text-gray-500 space-y-1">
                            <p>• Maximum file size: 10MB</p>
                            <p>• Supported format: CSV (.csv)</p>
                            <p>• First row should contain column headers</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
