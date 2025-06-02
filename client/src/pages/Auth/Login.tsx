import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import UpdateUserForm from '@/components/auth/UpdateUserForm';
import UserProfile from '@/components/auth/UserProfile';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { LoginFormData } from '@/types/Auth';
import { useState } from 'react';

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string;
}

interface UpdateUserFormData {
    id?: string;
    name?: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

const Login = () => {
    const { login, logout, user, register: registerUser } = useAuth();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleLogin = async (data: LoginFormData) => {
        try {
            const success = await login(data.email, data.password);
            if (success) {
                console.log('success', success);
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    const handleRegister = async (data: RegisterFormData) => {
        try {
            const success = await registerUser(data.email, data.password, data.name);
            console.log('submitting register', data, success);

            if (success) {
                console.log('✅ Registration success');
                setIsRegisterMode(false);
                alert('Registration successful! Please login.');
            } else {
                console.log('❌ Registration failed');
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed');
        }
    };

    const handleUpdateUser = async (data: UpdateUserFormData) => {
        try {
            const success = await api.put(`/users/${user._id}`, data, { withCredentials: true });
            console.log('updating user', data, success);

            if (success) {
                console.log('✅ Update success');
                setIsEditMode(false);
                alert('อัพเดทข้อมูลสำเร็จ!');
            } else {
                console.log('❌ Update failed');
                alert('อัพเดทข้อมูลไม่สำเร็จ');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('อัพเดทข้อมูลไม่สำเร็จ');
        }
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setIsEditMode(false);
    };

    const handleEditProfile = () => {
        setIsEditMode(true);
        setIsRegisterMode(false);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const getTitle = () => {
        if (isEditMode) return 'แก้ไขข้อมูล';
        if (user) return 'Welcome';
        return isRegisterMode ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ';
    };

    const getSubtitle = () => {
        if (isEditMode) return 'อัพเดทข้อมูลส่วนตัวของคุณ';
        if (user) return `เข้าสู่ระบบโดย : ${user.email}`;
        return isRegisterMode
            ? 'สร้างบัญชีใหม่เพื่อเริ่มต้น'
            : 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ';
    };

    const renderContent = () => {
        if (isEditMode && user) {
            return (
                <UpdateUserForm
                    user={user}
                    onSubmit={handleUpdateUser}
                    onCancel={handleCancelEdit}
                />
            );
        }

        if (user) {
            return (
                <UserProfile
                    user={user}
                    onLogout={logout}
                    onEditProfile={handleEditProfile}
                />
            );
        }

        if (isRegisterMode) {
            return (
                <RegisterForm
                    onSubmit={handleRegister}
                    onToggleMode={toggleMode}
                />
            );
        }

        return (
            <LoginForm
                onSubmit={handleLogin}
                onToggleMode={toggleMode}
            />
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md p-4 sm:p-8 space-y-5 bg-white rounded-xl shadow-sm transition-all hover:shadow-md mx-4">
                {!isEditMode && (
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {getTitle()}
                        </h1>
                        <h2 className="mt-2 text-base sm:text-lg text-gray-600">
                            {getSubtitle()}
                        </h2>
                    </div>
                )}

                {renderContent()}
            </div>
        </div>
    );
};

export default Login;