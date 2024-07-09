import { Route, Routes } from "react-router-dom";
import Home from "../home";
import { Header } from "../components/header";
import { Menu } from "../components/menu";
import Present from "../present";

export default function RoutesModule() {
  return (
    <>
      <div className="grid grid-cols-8 h-[100vh] bg-slate-500">
        <Header />
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/present" element={<Present />} />
        </Routes>
      </div>
    </>
  );
}
