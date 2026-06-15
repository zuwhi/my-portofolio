import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Footer, Navbar } from "./components";
import { About, Certificate, Contact, Home, Projects } from "./pages";
import Message from "./pages/Message";
import { logPageView } from "./analytics";

/**
 * PageTracker component that automatically logs page views
 * whenever the route location changes.
 */
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <PageTracker />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/msg" element={<Message />} />
                  <Route path="/certificate" element={<Certificate />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
