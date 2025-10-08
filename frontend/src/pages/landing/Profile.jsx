import React from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

const Profile = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-2">You're not signed in</h1>
        <p className="text-gray-600 mb-4">Please log in to view your profile details.</p>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                {user.name?.[0] || '?' }
              </div>
            )}
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-600">Welcome back! Here are your details.</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-sm break-all">{user._id}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={checkAuth}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
