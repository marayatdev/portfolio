import { useAuth } from './context/AuthContext';

const App = () => {


  const { login, logout, user } = useAuth();

  const handleSubmit = async () => {
    const success = await login('marayat1gmail.com', 'marayat');
    if (success) {
      // redirect to home
    } else {
      alert('Login failed');
    }
  };

  const logouts = async () => {

    await logout();

  };

  return (
    <>
      {user?.email ? <>Hello {user.email}</> : <>Not login</>}
      <button onClick={handleSubmit}>Login</button>
      <button onClick={logouts}>logout</button>
    </>
  );
};
export default App;
