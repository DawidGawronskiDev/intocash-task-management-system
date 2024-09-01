"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type Breadcrubs = {
  items: string[];
};

const Breadcrubs = ({ items }: Breadcrubs) => {
  const pathname = usePathname();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => {
          let link = "/" + items.slice(0, index + 1).join("/");

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={link}
                  className={clsx("capitalize", {
                    "font-semibold": pathname === link,
                  })}
                >
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrubs;
