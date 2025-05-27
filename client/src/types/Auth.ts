export interface LoginFormData {
    email: string;
    password: string;
}

// ...existing code...

export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string;
}