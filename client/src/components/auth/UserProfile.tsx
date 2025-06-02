import { Button } from '@/components/ui/button';

interface User {
    email: string;
    name?: string;
    // Add other user properties as needed
}

interface UserProfileProps {
    user: User;
    onLogout: () => void;
    onEditProfile?: () => void;
}

const UserProfile = ({ user, onLogout, onEditProfile }: UserProfileProps) => {
    return (
        <div className="space-y-3 sm:space-y-4">
            {/* User Info Display */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                    {user.name && (
                        <div>
                            <span className="text-sm text-gray-600">ชื่อ:</span>
                            <p className="font-medium text-gray-800">{user.name}</p>
                        </div>
                    )}
                    <div>
                        <span className="text-sm text-gray-600">อีเมล:</span>
                        <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
                {onEditProfile && (
                    <Button
                        onClick={onEditProfile}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.01]"
                    >
                        แก้ไขข้อมูล
                    </Button>
                )}

                <Button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500 transition-all duration-200 transform hover:scale-[1.01]"
                >
                    ออกจากระบบ
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;