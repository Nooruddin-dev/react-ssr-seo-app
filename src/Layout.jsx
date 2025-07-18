import { Link } from "react-router-dom";


export default function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">🌐 React SEO App</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/contactus">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/categories/123">Category</Link>
          <Link to="/en/category/category-seo-name">Dynamic</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Noor Dev. All rights reserved.</p>
      </footer>
    </div>
  );
}
