import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onUpload: (data: unknown) => void
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: unknown[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      onUpload(jsonData)
    }

    reader.readAsArrayBuffer(file)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      
      <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the Excel file here'
            : 'Drag and drop an Excel file here, or click to select'}
        </p>
    </div>
  )
}
