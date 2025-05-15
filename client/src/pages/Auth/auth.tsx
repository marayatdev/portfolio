import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const { login, logout, user } = useAuth();
  const handleSubmit = async () => {
    const success = await login('marayat.dev@gmail.com', 'marayat');
    if (success) {
      console.log('success', success);
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-4 sm:p-8 space-y-5 bg-white rounded-xl shadow-sm transition-all hover:shadow-md mx-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Authentication</h1>
          <h2 className="mt-2 text-base sm:text-lg text-gray-600">
            {user ? `Logged in as: ${user.email}` : 'Please log in to continue'}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.01]"
          >
            Login
          </button>

          <button
            onClick={logout}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
