"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudentForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    marks: "",
    course: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        rollNumber: initialData.rollNumber.toString(),
        marks: initialData.marks.toString(),
        course: initialData.course,
      })
    } else {
      setFormData({
        name: "",
        rollNumber: "",
        marks: "",
        course: "",
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const student = {
      ...(initialData && { id: initialData.id }),
      name: formData.name,
      rollNumber: Number.parseInt(formData.rollNumber),
      marks: Number.parseInt(formData.marks),
      course: formData.course,
    }

    onSubmit(student)

    if (!initialData) {
      setFormData({
        name: "",
        rollNumber: "",
        marks: "",
        course: "",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Student Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input
          id="rollNumber"
          name="rollNumber"
          type="number"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Enter roll number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="marks">Marks</Label>
        <Input
          id="marks"
          name="marks"
          type="number"
          value={formData.marks}
          onChange={handleChange}
          placeholder="Enter marks"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Input
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Enter course"
          required
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1">
          {initialData ? "Update" : "Add"} Student
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
