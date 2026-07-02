"use client"

import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <Link href="/" className="hover:text-gray-300">
        home
      </Link>
      <Link href="/blogs" className="hover:text-gray-300">
        blogs
      </Link>
      <Link href="/blogs/new" className="hover:text-gray-300">
        create new
      </Link>
    </nav>
  )
}