import NavigationLink from "./navigation-link";

const navigationLinks = ["components", "devices"];

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
