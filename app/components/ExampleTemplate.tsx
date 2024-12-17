import React from "react";
import { FileText } from "lucide-react";
import * as XLSX from "xlsx";

export const ExampleTemplate: React.FC = () => {
  const generateTemplate = () => {
    const workbook = XLSX.utils.book_new();
    const data = [
      {
        name: "John Smith",
        rollNumber: "CS2023001",
        department: "Computer Science",
      },
      {
        name: "Emma Johnson",
        rollNumber: "EE2023002",
        department: "Electrical Engineering",
      },
      {
        name: "Michael Brown",
        rollNumber: "ME2023003",
        department: "Mechanical Engineering",
      },
      // Add more example rows
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "exam-seating-template.xlsx");
  };

  return (
    <>
      <button
        onClick={generateTemplate}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 mx-auto"
      >
        <FileText size={16} />
        Download Example Template
      </button>

      <div className="bg-blue-50 mx-auto p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">
          Excel File Requirements:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• File must be in .xlsx or .xls format</li>
          <li>• Required columns: name, rollNumber, department</li>
          <li>• Each student should have a unique roll number</li>
          <li>• Download the example template for reference</li>
        </ul>
      </div>
    </>
  );
};
