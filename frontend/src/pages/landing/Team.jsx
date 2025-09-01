import { useEffect } from "react";
import { AdminStore } from "../../store/other/adminStore"


const Team = () => {
  const { allUsers, isLoading, fetchUsers } = AdminStore();
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center px-4 py-2">
                  No users found
                </td>
              </tr>
            ) : (
              allUsers.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Team;