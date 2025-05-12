export interface User {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    phone?: string;
    role: 'super_admin' | 'admin' | 'student' | 'user';
    isVerified: boolean;
    provider: 'google' | 'email' | 'github' | 'facebook' | 'custom';
    purchasedCourses: string[];
    createdAt: string;
    updatedAt: string;
  

    // permissions?: {
    //   canManageCourses?: boolean;
    //   canManageUsers?: boolean;
    //   canViewAnalytics?: boolean;
    // };
  

    // studentProfile?: {
    //   enrolledCourses: string[];
    //   progress: {
    //     [courseId: string]: number;
    //   };
    //   examScores?: {
    //     [examId: string]: number;
    //   };
    // };
  }
  