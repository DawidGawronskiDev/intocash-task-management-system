import NavigationLink from "./navigation-link";

const navigationLinks = [
  { name: "dashboard", href: "/dashboard" },
  { name: "components", href: "/dashboard/components" },
  { name: "devices", href: "/dashboard/devices" },
  { name: "tasks", href: "/dashboard/tasks" },
  { name: "keys", href: "/dashboard/keys" },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex items-center gap-4 text-sm">
        {navigationLinks.map((link, index) => (
          <NavigationLink key={index} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
