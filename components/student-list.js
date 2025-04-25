"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentList({ students, onDelete, onSelect }) {
  if (students.length === 0) {
    return (
      <Card className="border border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground text-center">
            No student records found. Add a new student to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.rollNumber}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>
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
                  <Button variant="ghost" size="icon" onClick={() => onSelect(student)} title="Edit student">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(student.id)}
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
  )
}
