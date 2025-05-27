import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { LoginFormData } from '@/types/Auth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

const Auth = () => {
  const { login, logout, user, register: registerUser } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLogin,
  } = useForm<LoginFormData>();

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegister,
    watch,
  } = useForm<RegisterFormData>();

  const watchPassword = watch('password');

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        console.log('success', success);
        resetLogin();
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const success = await registerUser(data.email, data.password, data.name);

      console.log('submitting register', data, success);

      if (success) {
        console.log('✅ Registration success');
        resetRegister();
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

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    resetLogin();
    resetRegister();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-4 sm:p-8 space-y-5 bg-white rounded-xl shadow-sm transition-all hover:shadow-md mx-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user ? 'Welcome' : isRegisterMode ? 'Sign Up' : 'Sign In'}
          </h1>
          <h2 className="mt-2 text-base sm:text-lg text-gray-600">
            {user
              ? `Logged in as: ${user.email}`
              : isRegisterMode
              ? 'Create your account'
              : 'Please log in to continue'}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {user ? (
            <Button
              onClick={logout}
              className="w-full px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500 transition-all duration-200 transform hover:scale-[1.01]"
            >
              Logout
            </Button>
          ) : (
            <>
              {isRegisterMode ? (
                // Registration Form
                <form onSubmit={handleSubmitSignup(onRegisterSubmit)} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name (Optional)"
                      {...registerSignup('name')}
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...registerSignup('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="bg-white"
                    />
                    {registerErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{registerErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...registerSignup('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className="bg-white"
                    />
                    {registerErrors.password && (
                      <p className="mt-1 text-sm text-red-600">{registerErrors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...registerSignup('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === watchPassword || 'Passwords do not match',
                      })}
                      className="bg-white"
                    />
                    {registerErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isRegisterSubmitting}
                    className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    {isRegisterSubmitting ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              ) : (
                // Login Form
                <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...registerLogin('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="bg-white"
                    />
                    {loginErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{loginErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...registerLogin('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className="bg-white"
                    />
                    {loginErrors.password && (
                      <p className="mt-1 text-sm text-red-600">{loginErrors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoginSubmitting}
                    className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:bg-indigo-300 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    {isLoginSubmitting ? 'Logging in...' : 'เข้าสู่ระบบ'}
                  </Button>
                </form>
              )}

              <p
                onClick={toggleMode}
                className="text-center text-base sm:text-lg text-gray-600 underline cursor-pointer hover:text-indigo-600 transition-colors"
              >
                {isRegisterMode ? 'กลับเข้าสู่ระบบ' : 'สมัครสมาชิก'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
