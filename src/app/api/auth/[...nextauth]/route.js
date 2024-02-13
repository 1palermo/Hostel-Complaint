import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
require('dotenv').config();

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      scopes: ['profile', 'email'],
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("session");
      const mailformat = /^[a-zA-Z0-9._%+-]+@dtu\.ac\.in$/;
      if(!user.email.match(mailformat)){
        console.log("*invalid email format");
        return false;
      }
      return true;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
