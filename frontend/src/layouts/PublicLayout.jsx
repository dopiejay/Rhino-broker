import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
//import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <TopBar /> */}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
