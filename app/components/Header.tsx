import { NavLink } from "@remix-run/react";

interface NavItem {
  label: string;
  link: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Create",
    link: "/create",
  },
  {
    label: "Items",
    link: "/items",
  },
];

export const Header = () => {
  return (
    <header>
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.link}
          style={{
            padding: "8px",
            margin: "8px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </header>
  );
};
