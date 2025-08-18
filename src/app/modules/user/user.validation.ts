import { z } from 'zod';

const userValidationSchema = z.object({
    name: z.string({ error: 'Name is required' }).min(1, { error: 'Name is required' }),
    dob: z.preprocess(
        (val) => {
            if (typeof val === 'string' || val instanceof Date) return new Date(val);
        },
        z.date({ error: 'Date of birth is required' })
    ),
    gender: z.enum(['Female', 'Male', 'Other'], { error: 'Gender must be Female, Male, or Other' }),
    mobile: z.string({ error: 'Mobile must be a string' }).optional(),
    email: z.email({ error: 'Invalid email address' }),
    password: z.string({ error: 'Password is required' }).min(6, { error: 'Password must be at least 6 characters long' }),
    status: z.enum(['unverified', 'verified', 'suspended'], { error: 'Status must be unverified, verified, or suspended' }).optional(),
    address: z.string({ error: 'Address must be a string' }).optional(),
    profile: z.object({
        profilePicture: z.string({ error: 'Profile picture must be a string' }).optional(),
        coverPhoto: z.string({ error: 'Cover photo must be a string' }).optional(),
        bio: z.string({ error: 'Bio must be a string' }).optional(),
    }).optional(),
    verified: z.object({
        isVerified: z.boolean({ error: 'isVerified must be a boolean' }),
        since: z.date({ error: 'since must be a valid date' }).optional(),
        expiresAt: z.date({ error: 'expiresAt must be a valid date' }).optional(),
    }).optional(),
    role: z.enum(['user', 'admin'], { error: "Role must be 'user' or 'admin'" }).optional(),
})

const loginSchema = userValidationSchema.pick({
    email: true,
    password: true,
});


const AuthValidation = {
    userValidationSchema,
    loginSchema,
};

export default AuthValidation;