import clsx from "clsx";
import Link from "next/link";

type NavigationLinkProps = {
  link: string;
};

const NavigationLink = ({ link }: NavigationLinkProps) => {
  return (
    <li>
      <Link
        href={"/dashboard/" + link}
        className={clsx("capitalize", {
          "font-bold": link.startsWith("/dashboard/" + link),
        })}
      >
        {link}
      </Link>
    </li>
  );
};

export default NavigationLink;
