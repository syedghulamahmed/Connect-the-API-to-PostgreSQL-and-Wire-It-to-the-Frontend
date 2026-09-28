import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { InternshipDetails } from "./pages/InternshipDetails";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/internships/:id" element={<InternshipDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
