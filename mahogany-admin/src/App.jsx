import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuoteRequests from "./pages/QuoteRequests";
import Messages from "./pages/Messages";
import ContentEditor from "./pages/ContentEditor";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quotes" element={<QuoteRequests />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/content" element={<ContentEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
