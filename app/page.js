"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, SortAsc, SortDesc, Edit, Trash2 } from "lucide-react"

// Simple student record management system using arrays instead of linked lists
// This makes the code easier to understand while keeping the same functionality
export default function Home() {
  // State for storing student records
  const [students, setStudents] = useState([])

  // State for tracking which student is being edited
  const [editingStudent, setEditingStudent] = useState(null)

  // State for search functionality
  const [searchText, setSearchText] = useState("")

  // State for sorting functionality
  const [sortBy, setSortBy] = useState("rollNumber")
  const [sortOrder, setSortOrder] = useState("asc") // asc or desc

  // State for the form inputs
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNumber: "",
    marks: "",
    course: "",
  })

  // Load sample data when the component first renders
  useEffect(() => {
    // Sample student data
    const sampleStudents = [
      { id: "1", name: "John Doe", rollNumber: 101, marks: 85, course: "Computer Science" },
      { id: "2", name: "Jane Smith", rollNumber: 102, marks: 92, course: "Electrical Engineering" },
      { id: "3", name: "Bob Johnson", rollNumber: 103, marks: 78, course: "Mechanical Engineering" },
      { id: "4", name: "Alice Brown", rollNumber: 104, marks: 95, course: "Information Technology" },
      { id: "5", name: "Charlie Wilson", rollNumber: 105, marks: 88, course: "Civil Engineering" },
    ]

    setStudents(sampleStudents)
  }, [])

  // Update the form when a student is selected for editing
  useEffect(() => {
    if (editingStudent) {
      setStudentForm({
        name: editingStudent.name,
        rollNumber: editingStudent.rollNumber.toString(),
        marks: editingStudent.marks.toString(),
        course: editingStudent.course,
      })
    } else {
      // Reset form when not editing
      setStudentForm({
        name: "",
        rollNumber: "",
        marks: "",
        course: "",
      })
    }
  }, [editingStudent])

  // Handle form input changes
  function handleInputChange(e) {
    const { name, value } = e.target
    setStudentForm({
      ...studentForm,
      [name]: value,
    })
  }

  // Handle form submission (add or update student)
  function handleFormSubmit(e) {
    e.preventDefault()

    // Create a student object from form data
    const student = {
      name: studentForm.name,
      rollNumber: Number(studentForm.rollNumber),
      marks: Number(studentForm.marks),
      course: studentForm.course,
    }

    if (editingStudent) {
      // Update existing student
      student.id = editingStudent.id

      setStudents(students.map((s) => (s.id === student.id ? student : s)))

      // Exit edit mode
      setEditingStudent(null)
    } else {
      // Add new student with a unique ID
      student.id = Date.now().toString()
      setStudents([...students, student])
    }

    // Reset form
    setStudentForm({
      name: "",
      rollNumber: "",
      marks: "",
      course: "",
    })
  }

  // Delete a student by ID
  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id))

    // If we're editing the student that was deleted, exit edit mode
    if (editingStudent && editingStudent.id === id) {
      setEditingStudent(null)
    }
  }

  // Select a student for editing
  function editStudent(student) {
    setEditingStudent(student)
  }

  // Cancel editing
  function cancelEdit() {
    setEditingStudent(null)
  }

  // Handle sorting
  function handleSort(field) {
    if (sortBy === field) {
      // If already sorting by this field, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Otherwise, sort by the new field in ascending order
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Handle search
  function handleSearch(text) {
    setSearchText(text)
  }

  // Filter and sort students for display
  const displayStudents = students
    // First filter by search text
    .filter((student) => {
      if (!searchText) return true

      const searchLower = searchText.toLowerCase()
      return (
        student.name.toLowerCase().includes(searchLower) ||
        student.rollNumber.toString().includes(searchLower) ||
        student.course.toLowerCase().includes(searchLower) ||
        student.marks.toString().includes(searchLower)
      )
    })
    // Then sort by the selected field
    .sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      // For strings (like name and course)
      if (typeof valueA === "string") {
        return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      // For numbers (like rollNumber and marks)
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA
    })

  return (
    <main className="container mx-auto py-8 px-4">
      {/* Header */}
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl">Student Record Management System</CardTitle>
          <CardDescription className="text-gray-100">Simple Implementation for Educational Purposes</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Form */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{editingStudent ? "Update Student" : "Add New Student"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={studentForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              {/* Roll Number Field */}
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  type="number"
                  value={studentForm.rollNumber}
                  onChange={handleInputChange}
                  placeholder="Enter roll number"
                  required
                />
              </div>

              {/* Marks Field */}
              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>
                <Input
                  id="marks"
                  name="marks"
                  type="number"
                  value={studentForm.marks}
                  onChange={handleInputChange}
                  placeholder="Enter marks"
                  required
                />
              </div>

              {/* Course Field */}
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  name="course"
                  value={studentForm.course}
                  onChange={handleInputChange}
                  placeholder="Enter course"
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">
                  {editingStudent ? "Update" : "Add"} Student
                </Button>
                {editingStudent && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>

              {/* Sort Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleSort("rollNumber")} className="flex items-center gap-1">
                  Roll No
                  {sortBy === "rollNumber" &&
                    (sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
                </Button>
                <Button variant="outline" onClick={() => handleSort("marks")} className="flex items-center gap-1">
                  Marks
                  {sortBy === "marks" &&
                    (sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Empty State */}
            {displayStudents.length === 0 ? (
              <Card className="border border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-muted-foreground text-center">
                    No student records found. Add a new student to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /* Student Table */
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>
                          {/* Badge color based on marks */}
                          <Badge
                            variant={
                              student.marks >= 90
                                ? "default"
                                : student.marks >= 80
                                  ? "secondary"
                                  : student.marks >= 70
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {student.marks}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {/* Edit Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => editStudent(student)}
                              title="Edit student"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {/* Delete Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteStudent(student.id)}
                              className="text-destructive"
                              title="Delete student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
