import { DoublyLinkedList } from "./doubly-linked-list"

export class StudentRecordManager {
  constructor() {
    this.students = new DoublyLinkedList()
  }

  // Add a new student
  addStudent(student) {
    const newStudent = {
      ...student,
      id: student.id || String(Math.random()).substring(2, 10),
    }

    this.students.append(newStudent)
    return newStudent
  }

  // Get a student by ID
  getStudentById(id) {
    return this.students.find((student) => student.id === id)
  }

  // Update a student
  updateStudent(updatedStudent) {
    return this.students.update((student) => student.id === updatedStudent.id, updatedStudent)
  }

  // Delete a student
  deleteStudent(id) {
    return this.students.remove((student) => student.id === id)
  }

  // Get all students
  getAllStudents() {
    return this.students.toArray()
  }

  // Sort students by a specific field
  sortBy(field, order = "asc") {
    const sortedArray = this.students.sort((a, b) => {
      const valueA = a[field]
      const valueB = b[field]

      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA
      }

      return 0
    })

    // Clear and rebuild the list with the sorted array
    this.students.clear()
    sortedArray.forEach((student) => this.students.append(student))

    return sortedArray
  }

  // Search students by name, roll number, or course
  searchStudents(query) {
    const lowerQuery = query.toLowerCase()

    return this.students.search(
      (student) =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.rollNumber.toString().includes(lowerQuery) ||
        student.course.toLowerCase().includes(lowerQuery) ||
        student.marks.toString().includes(lowerQuery),
    )
  }
}
