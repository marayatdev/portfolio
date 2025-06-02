import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginFormData } from '@/types/Auth';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    onToggleMode: () => void;
}

const LoginForm = ({ onSubmit, onToggleMode }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginFormData>();

    const handleFormSubmit = async (data: LoginFormData) => {
        await onSubmit(data);
        reset();
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        className="bg-white"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        className="bg-white"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:bg-indigo-300 transition-all duration-200 transform hover:scale-[1.01]"
                >
                    {isSubmitting ? 'Logging in...' : 'เข้าสู่ระบบ'}
                </Button>
            </form>

            <p
                onClick={onToggleMode}
                className="text-center text-base sm:text-lg text-gray-600 underline cursor-pointer hover:text-indigo-600 transition-colors"
            >
                สมัครสมาชิก
            </p>
        </div>
    );
};

export default LoginForm;