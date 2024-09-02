"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinkProps = {
  link: { name: string; href: string };
};

const NavigationLink = ({ link }: NavigationLinkProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={link.href}
        className={clsx("capitalize", {
          "font-semibold": pathname.startsWith(link.href),
        })}
      >
        {link.name}
      </Link>
    </li>
  );
};

export default NavigationLink;
