import { useAuth } from "@/context/AuthContext";

const Auth = () => {
    const { login, logout } = useAuth();
    const handleSubmit = async () => {
        const success = await login('marayat.dev@gmail.com', 'marayat');
        if (success) {
            console.log('success', success);

        } else {
            alert('Login failed');
        }
    };



    return (
        <>
            <button onClick={handleSubmit}>Login</button>
            <button onClick={logout}>logout</button>
        </>
    )
}
export default Auth