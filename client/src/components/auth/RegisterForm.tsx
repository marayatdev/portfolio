import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string;
}

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => Promise<void>;
    onToggleMode: () => void;
}

const RegisterForm = ({ onSubmit, onToggleMode }: RegisterFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<RegisterFormData>();

    const watchPassword = watch('password');

    const handleFormSubmit = async (data: RegisterFormData) => {
        await onSubmit(data);
        reset();
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <Input
                        type="text"
                        placeholder="Full Name (Optional)"
                        {...register('name')}
                        className="bg-white"
                    />
                </div>

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

                <div>
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === watchPassword || 'Passwords do not match',
                        })}
                        className="bg-white"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-white bg-[#112240] rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-all duration-200 transform hover:scale-[1.01]"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </form>

            <p
                onClick={onToggleMode}
                className="text-center text-base sm:text-lg text-gray-600 underline cursor-pointer hover:text-indigo-600 transition-colors"
            >
                กลับเข้าสู่ระบบ
            </p>
        </div>
    );
};

export default RegisterForm;