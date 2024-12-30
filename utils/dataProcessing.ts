import { ProcessedData, Student, RoomConfig } from "@/types";
// interface Student {
//   department: string
//   rollNumber: string
// }


// interface RoomConfig {
//   name: string
//   columns: number
//   capacity: number
// }

// export function processExcelData(data: Student[], roomConfigs: RoomConfig[]) {

//   console.log("data==", data);

//   const departments = [...new Set(data.map(student => student.department))]
//   console.log("departments==", departments)

//   const studentsPerDepartment = departments.map(dept => data.filter(student => student.department === dept))
//   console.log("studentsPerDepartment===", studentsPerDepartment);

//   const rooms = []
//   let studentIndex = 0
//   const totalStudents = data.length

//   for (const roomConfig of roomConfigs) {
//     const room = []
//     const rowsInRoom = Math.ceil(roomConfig.capacity / roomConfig.columns)
    
//     for (let row = 0; row < rowsInRoom; row++) {
//       const rowData = []
//       for (let col = 0; col < roomConfig.columns; col++) {
//         if (studentIndex < totalStudents) {
//           const deptIndex = Math.floor(studentIndex / 2) % departments.length
//           const studentInDept = studentsPerDepartment[deptIndex][Math.floor(studentIndex / (2 * departments.length))]
          
//           if (studentIndex % 2 === 0 && col < roomConfig.columns - 1) {
//             rowData.push(`${studentInDept.department} ${studentInDept.rollNumber}`)
//             rowData.push('') // Skip a column
//             col++ // Increment column to account for the skipped one
//           } else {
//             rowData.push(`${studentInDept.department} ${studentInDept.rollNumber}`)
//           }
          
//           studentIndex++
//         } else {
//           rowData.push('')
//         }
//       }
//       room.push(rowData)
//     }
//     rooms.push(room)

//     if (studentIndex >= totalStudents) break
//   }
  
//   return { rooms, originalData: data }
// }


// ======================================

export function processExcelData(data: Student[], roomConfigs: RoomConfig[]): ProcessedData {
  console.log("data==", data);

  const departments = [...new Set(data.map((student) => student.department))];
  console.log("departments==", departments);

  const studentsPerDepartment = departments.map((dept) =>
    data.filter((student) => student.department === dept)
  );
  console.log("studentsPerDepartment===", studentsPerDepartment);

  const rooms = [];
  let studentIndex = 0;
  const totalStudents = data.length;

  for (const roomConfig of roomConfigs) {
    const room: string[][] = [];
    const rowsInRoom = Math.ceil(roomConfig.capacity / roomConfig.columns);

    for (let row = 0; row < rowsInRoom; row++) {
      room.push(new Array(roomConfig.columns).fill(""));
    }

    const placedStudents: Set<string> = new Set();

    const isValidSeat = (row: number, col: number, department: string): boolean => {
      const adjacentSeats = [
        room[row - 1]?.[col],
        room[row + 1]?.[col],
        room[row]?.[col - 1],
        room[row]?.[col + 1],
      ];
      return !adjacentSeats.some((seat) => seat?.startsWith(department));
    };

    for (let row = 0; row < rowsInRoom; row++) {
      for (let col = 0; col < roomConfig.columns; col++) {
        if (studentIndex >= totalStudents) break;

        let foundStudent = false;

        for (let deptIndex = 0; deptIndex < departments.length; deptIndex++) {
          const studentsInDept = studentsPerDepartment[deptIndex];

          for (const student of studentsInDept) {
            const studentKey = `${student.department} ${student.rollNumber}`;
            if (
              !placedStudents.has(studentKey) &&
              isValidSeat(row, col, student.department)
            ) {
              room[row][col] = studentKey;
              placedStudents.add(studentKey);
              studentIndex++; // Increment here
              foundStudent = true;
              break;
            }
          }

          if (foundStudent) break;
        }
      }
    }

    rooms.push(room);

    if (studentIndex >= totalStudents) break;
  }

  return { rooms, originalData: data };
}


// ======================================

// interface Student {
//   department: string;
//   rollNumber: string;
// }

// interface RoomConfig {
//   name: string;
//   columns: number;
//   capacity: number;
// }

// export function processExcelData(data: Student[], roomConfigs: RoomConfig[]) {
//   const departments = [...new Set(data.map((student) => student.department))];

//   // Group students by department
//   const studentsPerDepartment = departments.map((dept) =>
//     data.filter((student) => student.department === dept)
//   );

//   const rooms = [];
//   const totalStudents = data.length;

//   for (const roomConfig of roomConfigs) {
//     const room: string[][] = [];
//     const rowsInRoom = Math.ceil(roomConfig.capacity / roomConfig.columns);

//     // Track the current position in each department
//     const departmentIndexes = Array(departments.length).fill(0);

//     for (let row = 0; row < rowsInRoom; row++) {
//       const rowData: string[] = [];

//       for (let col = 0; col < roomConfig.columns; col++) {
//         // Determine which department's student to seat
//         const departmentIndex = (row + col) % departments.length;
//         const studentList = studentsPerDepartment[departmentIndex];

//         // Assign a student if available
//         if (departmentIndexes[departmentIndex] < studentList.length) {
//           const student =
//             studentList[departmentIndexes[departmentIndex]++];
//           rowData.push(`${student.department} ${student.rollNumber}`);
//         } else {
//           rowData.push(""); // Empty seat if no more students
//         }
//       }

//       room.push(rowData);
//     }

//     rooms.push(room);
//   }

//   return { rooms, originalData: data };
// }
