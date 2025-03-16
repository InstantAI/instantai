import React from 'react';
import NotebookListPage from './pages/NotebookListPage';
import { AuthProvider } from './AuthContext.jsx';
import NavBar from "./components/NavBar.jsx";

function App() {
    return (
        <AuthProvider>
            <NavBar />
            <NotebookListPage />
        </AuthProvider>
    );
}

export default App;