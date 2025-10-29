import React from "react"
import Navbar from "../Components/Navbar"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  )
}
