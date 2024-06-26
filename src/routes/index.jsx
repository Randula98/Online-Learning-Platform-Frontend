import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    NavBar,
    Footer
} from "../components";

import {
    Landing,
    Course,
    Courses,
    AdminDashboard,
    AdminCourse,
    MyCourses,
    Announcements
} from "../pages";

export default function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/course/:id" element={<AdminCourse />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/announcements" element={<Announcements />} />
            </Routes>
            <Footer />
        </Router>
    );
}