import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import ChatPanel from "./components/ChatPanel";
import "./App.css";

function App() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [refreshKey, setRefreshKey] = useState(0);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <Sidebar
        setFilter={setFilter}
        theme={theme}
        setTheme={setTheme}
      />

      <MessageList
        onSelect={setSelectedMessage}
        filter={filter}
        refreshKey={refreshKey}
      />

      <ChatPanel
        message={selectedMessage}
        onResolved={() => {
          setSelectedMessage(null);
          setRefreshKey(prev => prev + 1);
        }}
      />
    </div>
  );
}

export default App;
