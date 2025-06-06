import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface User {
    _id?: string;
    email: string;
    name?: string;
}

export interface UpdateUserFormData {
    id?: string;
    name?: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

interface UpdateUserFormProps {
    user: User;
    onSubmit: (data: UpdateUserFormData) => Promise<void>;
    onCancel: () => void;
    showPasswordFields?: boolean;
}

const UpdateUserForm = ({
    user,
    onSubmit,
    onCancel,
    showPasswordFields = true
}: UpdateUserFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        setError,
        clearErrors,
    } = useForm<UpdateUserFormData>();

    const [passwordCheckError, setPasswordCheckError] = useState<string>('');

    console.log(user._id);

    const watchNewPassword = watch('newPassword');
    const watchCurrentPassword = watch('currentPassword');

    useEffect(() => {
        setValue('email', user.email);
        setValue('name', user.name || '');
    }, [user, setValue]);

    useEffect(() => {
        if (watchCurrentPassword && passwordCheckError) {
            setPasswordCheckError('');
        }
    }, [watchCurrentPassword, passwordCheckError]);

    const handleFormSubmit = async (data: UpdateUserFormData) => {
        try {
            setPasswordCheckError('');

            const isChangingPassword = data.newPassword && data.newPassword.trim() !== '';

            if (isChangingPassword) {
                if (!data.currentPassword || data.currentPassword.trim() === '') {
                    setError('currentPassword', {
                        type: 'manual',
                        message: 'กรุณากรอกรหัสผ่านปัจจุบัน'
                    });
                    return;
                }

                try {
                    const checkCurrentPassword = await api.post(
                        `/users/check-password/${user._id}`,
                        { password: data.currentPassword },
                        { withCredentials: true }
                    );

                    if (!checkCurrentPassword.data.success) {
                        setPasswordCheckError('รหัสผ่านปัจจุบันไม่ถูกต้อง');
                        setError('currentPassword', {
                            type: 'manual',
                            message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง'
                        });
                        return;
                    }
                } catch (passwordError: any) {
                    console.error('Password check error:', passwordError);
                    const errorMessage = passwordError.response?.data?.message || 'ไม่สามารถตรวจสอบรหัสผ่านได้';
                    setPasswordCheckError(errorMessage);
                    setError('currentPassword', {
                        type: 'manual',
                        message: errorMessage
                    });
                    return;
                }
            }

            const submitData = { ...data };
            if (!isChangingPassword) {
                delete submitData.currentPassword;
                delete submitData.newPassword;
                delete submitData.confirmNewPassword;
            }

            await onSubmit(submitData);

        } catch (error: any) {
            console.error('Update error:', error);
            const errorMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล';
            alert(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 sm:p-6 space-y-4 bg-white rounded-xl shadow-sm">
            <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    แก้ไขข้อมูลส่วนตัว
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    อัพเดทข้อมูลของคุณ
                </p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อ-นามสกุล
                    </label>
                    <Input
                        type="text"
                        placeholder="ชื่อ-นามสกุล"
                        {...register('name')}
                        className="bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        อีเมล <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="email"
                        placeholder="อีเมล"
                        {...register('email', {
                            required: 'กรุณากรอกอีเมล',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'รูปแบบอีเมลไม่ถูกต้อง',
                            },
                        })}
                        className="bg-white"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Fields */}
                {showPasswordFields && (
                    <>
                        <div className="border-t pt-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">
                                เปลี่ยนรหัสผ่าน (ถ้าต้องการ)
                            </h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                รหัสผ่านปัจจุบัน
                            </label>
                            <Input
                                type="password"
                                placeholder="รหัสผ่านปัจจุบัน"
                                {...register('currentPassword', {
                                    validate: (value) => {
                                        const newPassword = watch('newPassword');
                                        if (newPassword && newPassword.trim() !== '' && (!value || value.trim() === '')) {
                                            return 'กรุณากรอกรหัสผ่านปัจจุบัน';
                                        }
                                        return true;
                                    }
                                })}
                                className={`bg-white ${errors.currentPassword ? 'border-red-500' : ''}`}
                                onChange={(e) => {
                                    // Clear errors when user starts typing
                                    if (passwordCheckError) {
                                        setPasswordCheckError('');
                                        clearErrors('currentPassword');
                                    }
                                }}
                            />
                            {errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.currentPassword.message}
                                </p>
                            )}
                            {passwordCheckError && !errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {passwordCheckError}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                รหัสผ่านใหม่
                            </label>
                            <Input
                                type="password"
                                placeholder="รหัสผ่านใหม่"
                                {...register('newPassword', {
                                    validate: (value) => {
                                        if (value && value.trim() !== '' && value.length < 6) {
                                            return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
                                        }
                                        return true;
                                    }
                                })}
                                className="bg-white"
                            />
                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ยืนยันรหัสผ่านใหม่
                            </label>
                            <Input
                                type="password"
                                placeholder="ยืนยันรหัสผ่านใหม่"
                                {...register('confirmNewPassword', {
                                    validate: (value) => {
                                        const newPassword = watch('newPassword');
                                        if (newPassword && newPassword.trim() !== '' && value !== newPassword) {
                                            return 'รหัสผ่านไม่ตรงกัน';
                                        }
                                        return true;
                                    }
                                })}
                                className="bg-white"
                            />
                            {errors.confirmNewPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmNewPassword.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-1/2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200"
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-1/2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-all duration-200 transform hover:scale-[1.01]"
                    >
                        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserForm;