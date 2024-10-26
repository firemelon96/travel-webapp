// import { UserRole } from '@prisma/client';
// import { DefaultSession } from 'next-auth';

// export type ExtendedUser = DefaultSession['user'] & {
//   role: UserRole;
// };

// declare module 'next-auth' {
//   interface Session {
//     user: ExtendedUser;
//   }
// }

// next-auth.d.ts
import { UserRole } from '@prisma/client';
import { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: string; // Add the role property to the User type
  }

  interface Session {
    user: {
      role?: UserRole;
    } & DefaultUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
  }
}
