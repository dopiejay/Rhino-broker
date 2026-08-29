import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteContentProvider } from "./site/SiteContentProvider";
import { AuthProvider } from "./admin/context/AuthContext";
import AdminLayout from "./admin/components/Layout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminQuoteRequests from "./admin/pages/QuoteRequests";
import AdminContentEditor from "./admin/pages/ContentEditor";
import AdminUsers from "./admin/pages/AdminUsers";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Quote from "./pages/Quote";
import Claims from "./pages/Claims";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <SiteContentProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="quotes" element={<AdminQuoteRequests />} />
              <Route path="content" element={<AdminContentEditor />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/services" element={<Services />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SiteContentProvider>
  );
}
