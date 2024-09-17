import NavigationLink from "./navigation-link";

const navigationLinks = [
  { name: "dashboard", href: "/dashboard" },
  { name: "components", href: "/components" },
  { name: "devices", href: "/devices" },
  { name: "tasks", href: "/tasks" },
  { name: "keys", href: "/keys" },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row items-start gap-4 text-sm">
        {navigationLinks.map((link, index) => (
          <NavigationLink key={index} link={link} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
