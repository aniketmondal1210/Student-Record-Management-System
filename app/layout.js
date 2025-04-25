import "./globals.css"

export const metadata = {
  title: "Student Record Management System",
  description: "A simple student record management system for educational purposes",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
