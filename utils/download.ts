import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable plugin
import * as XLSX from 'xlsx';
import { ProcessedData, RoomConfig } from '@/types';
import type { UserOptions as AutoTableOptions } from 'jspdf-autotable'; // Import the correct type

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
  }
}

export function downloadPDF(seatPlan: ProcessedData, roomConfigs: RoomConfig[]) {
  const doc = new jsPDF();

  seatPlan.rooms.forEach((room, roomIndex) => {
    if (roomIndex > 0) {
      doc.addPage();
    }

    doc.setFontSize(16);
    doc.text(roomConfigs[roomIndex].name, 14, 15);

    const headers = Array(roomConfigs[roomIndex].columns)
      .fill(0)
      .map((_, i) => `Column ${i + 1}`);

    doc.autoTable({
      startY: 20,
      head: [headers],
      body: room,
    });
  });

  doc.save('seat_plan.pdf');
}

export function downloadExcel(seatPlan: ProcessedData, roomConfigs: RoomConfig[]) {
  const wb = XLSX.utils.book_new();

  seatPlan.rooms.forEach((room, roomIndex) => {
    const headers = Array(roomConfigs[roomIndex].columns)
      .fill(0)
      .map((_, i) => `Column ${i + 1}`);
    const wsData = [headers, ...room];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, roomConfigs[roomIndex].name);
  });

  XLSX.writeFile(wb, 'seat_plan.xlsx');
}
