import { dbConnect } from "@/lib/dbConnect";
import PeopleModel, { Person } from "@/models/people-model";
import GoogleProvider from "next-auth/providers/google";
import { Account, Profile } from "next-auth";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: Account; profile: Profile }) {
      if (account.provider === "google") {
        await dbConnect();
        const users: Person[] = await PeopleModel.find({});
        console.log(users, account, profile);

        return users.some((user) => user.email === profile.email);
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default options;
