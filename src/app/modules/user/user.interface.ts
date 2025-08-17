
export interface IUser {
    name: string
    dob: Date;
    gender: 'Female' | 'Male' | 'Other';
    mobile?: string;
    email: string;
    password: string;
    status?: 'unverified' | 'verified' | 'suspended';
    address?: string;
    profile?: {
        profilePicture?: string;
        coverPhoto?: string;
        bio?: string;
    };
    verified?: {
        isVerified: boolean;
        since?: Date;
        expiresAt?: Date;
    };
    role?: 'user' | 'admin';
}
