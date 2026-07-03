"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="font-bold text-xl hover:text-gray-300">
          Blog App
        </Link>
        <Link href="/blogs" className="hover:text-gray-300">
          blogs
        </Link>
        <Link href="/users" className="hover:text-gray-300">
          users
        </Link>
        
        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <Link href="/me" className="hover:text-gray-300 text-sm">
                me
              </Link>
              <Link href="/blogs/new" className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm">
                + New
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                login
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm">
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}