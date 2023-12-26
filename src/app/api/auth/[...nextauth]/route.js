import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  secret: ,
  providers: [
    GoogleProvider({
      clientId: ,
      clientSecret: ,
      scopes: ['profile', 'email'],
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user.email)
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
