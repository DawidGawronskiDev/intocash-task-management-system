import options from "@/app/api/auth/[...nextauth]/options";
import Navigation from "@/components/dashboard/navigation/navigation";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession(options);

  return (
    <header className="p-4 flex items-center justify-between">
      <Navigation />
      {session && (
        <Button variant="secondary">
          <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
