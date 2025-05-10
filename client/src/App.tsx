import { useAuth } from './context/AuthContext';

const App = () => {


  const { login } = useAuth();

  const handleSubmit = async () => {
    const success = await login('marayat1gmail.com', 'marayat');
    if (success) {
      // redirect to home
    } else {
      alert('Login failed');
    }
  };

  return (
    <button onClick={handleSubmit}>Login</button>
  );
};
export default App;
