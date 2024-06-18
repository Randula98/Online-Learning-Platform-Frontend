import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    NavBar,
    Footer
} from "../components";

import {
    Landing,
    Course
} from "../pages";

export default function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/course" element={<Course />} />
            </Routes>
            <Footer />
        </Router>
    );
}