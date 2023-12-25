import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  secret: "Cscwel9MoBlwx6B689Fb4/kOwxYp/YIkK1/MKEAVixA=",
  providers: [
    GoogleProvider({
      clientId: "1010618076889-08tjso93glf22tik2okuvcic621u0l8k.apps.googleusercontent.com",
      clientSecret: "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",
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
