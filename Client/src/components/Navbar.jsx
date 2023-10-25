export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Home
      </a>
      <ul>
        <CustomLink href="/movies">Movies</CustomLink>
        <CustomLink href="/customers">Customers</CustomLink>
        <CustomLink href="/reports">Reports</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ href, children, ...props }) {
  const path = window.location.pathname;
  return (
    <li className={path === href ? "active" : ""}>
      <a href={href}>{children}</a>
    </li>
  );
}
