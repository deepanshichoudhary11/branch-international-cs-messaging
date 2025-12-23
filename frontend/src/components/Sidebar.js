export default function Sidebar({ setFilter, theme, setTheme }) {
  return (
    <div className="sidebar">
      <div>
        <h1>Branch International</h1>
        <p className="subtitle">Customer Support</p>

        <div className="menu">
          <p onClick={() => setFilter("ALL")}>📥 All Messages</p>
          <p onClick={() => setFilter("URGENT")} className="urgent">
            🔥 Urgent
          </p>
          <p onClick={() => setFilter("RESOLVED")} className="resolved">
            ✅ Resolved
          </p>
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
