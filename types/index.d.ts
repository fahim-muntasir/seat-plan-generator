export type Student = { 
  name: string;
  rollNumber: string;
  department: string;
  __rowNum__: number; 
};

export type ProcessedData = {
  originalData: Student[];
  rooms: string[][][];
}

export type RoomConfig = {
  name: string;
  columns: number;
  capacity: number;
}