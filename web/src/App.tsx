import React, { useState } from 'react';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                {/* Sidebar content */}
            </div>
            <div className="top-menu">
                {/* Top menu content */}
            </div>
            <div className="canvas">
                {/* Canvas area for drawing */}
            </div>
        </div>
    );
};

export default App;
