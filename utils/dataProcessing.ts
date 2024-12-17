interface Student {
  department: string
  rollNumber: string
}

interface RoomConfig {
  name: string
  columns: number
  capacity: number
}

export function processExcelData(data: Student[], roomConfigs: RoomConfig[]) {
  const departments = [...new Set(data.map(student => student.department))]
  const studentsPerDepartment = departments.map(dept => data.filter(student => student.department === dept))
  
  const rooms = []
  let studentIndex = 0
  const totalStudents = data.length

  for (const roomConfig of roomConfigs) {
    const room = []
    const rowsInRoom = Math.ceil(roomConfig.capacity / roomConfig.columns)
    
    for (let row = 0; row < rowsInRoom; row++) {
      const rowData = []
      for (let col = 0; col < roomConfig.columns; col++) {
        if (studentIndex < totalStudents) {
          const deptIndex = Math.floor(studentIndex / 2) % departments.length
          const studentInDept = studentsPerDepartment[deptIndex][Math.floor(studentIndex / (2 * departments.length))]
          
          if (studentIndex % 2 === 0 && col < roomConfig.columns - 1) {
            rowData.push(`${studentInDept.department} ${studentInDept.rollNumber}`)
            rowData.push('') // Skip a column
            col++ // Increment column to account for the skipped one
          } else {
            rowData.push(`${studentInDept.department} ${studentInDept.rollNumber}`)
          }
          
          studentIndex++
        } else {
          rowData.push('')
        }
      }
      room.push(rowData)
    }
    rooms.push(room)

    if (studentIndex >= totalStudents) break
  }
  
  return { rooms, originalData: data }
}

