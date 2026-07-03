import Link from "next/link"
import { getUsers } from "../services/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No users yet.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
              <Link
                href={`/users/${user.username}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {user.name}
              </Link>
              <span className="text-gray-500 text-sm ml-2">(@{user.username})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}