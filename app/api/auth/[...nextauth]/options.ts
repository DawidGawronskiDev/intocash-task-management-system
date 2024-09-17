import { dbConnect } from "@/lib/dbConnect";
import PeopleModel, { Person } from "@/models/people-model";
import GoogleProvider from "next-auth/providers/google";
import { Account, Profile, User } from "next-auth";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }) {
      if (account && account.provider === "google" && profile) {
        await dbConnect();
        const users: Person[] = await PeopleModel.find({});
        console.log(users, account, profile);

        return users.some((user) => user.email === profile.email);
      }
      return false; // or return true if you want to allow access even without Google
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default options;
