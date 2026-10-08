import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {

    // =========================
    // LOGIN
    // =========================

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // =========================
    // CURRENT PAGE
    // =========================

    const [currentPage, setCurrentPage] = useState("dashboard");

    // =========================
    // LOCAL STORAGE
    // =========================

    const getData = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            return [];
        }
    };

    const saveData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    // =========================
    // DATA
    // =========================

    const [students, setStudents] = useState(
        getData("students")
    );

    const [rooms, setRooms] = useState(
        getData("rooms")
    );

    const [complaints, setComplaints] = useState(
        getData("complaints")
    );

    const [visitors, setVisitors] = useState(
        getData("visitors")
    );

    const [fees, setFees] = useState(
        getData("fees")
    );

    const [announcements, setAnnouncements] = useState(
        getData("announcements")
    );

    // =========================
    // STUDENT FORM STATES
    // =========================

    const [studentName, setStudentName] = useState("");
    const [roll, setRoll] = useState("");
    const [course, setCourse] = useState("");
    const [phone, setPhone] = useState("");
    const [studentRoom, setStudentRoom] = useState("");

    // =========================
    // ROOM FORM STATES
    // =========================

    const [roomNo, setRoomNo] = useState("");
    const [capacity, setCapacity] = useState("");
    const [occupied, setOccupied] = useState("");

    // =========================
    // COMPLAINT FORM STATES
    // =========================

    const [complaintStudent, setComplaintStudent] = useState("");
    const [complaintRoom, setComplaintRoom] = useState("");
    const [complaintText, setComplaintText] = useState("");

    // =========================
    // VISITOR FORM STATES
    // =========================

    const [visitorName, setVisitorName] = useState("");
    const [visitorStudent, setVisitorStudent] = useState("");
    const [visitorRoom, setVisitorRoom] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [visitorDate, setVisitorDate] = useState("");

    // =========================
    // FEE FORM STATES
    // =========================

    const [feeStudent, setFeeStudent] = useState("");
    const [feeAmount, setFeeAmount] = useState("");

    // =========================
    // ANNOUNCEMENT FORM STATES
    // =========================

    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [announcementMessage, setAnnouncementMessage] = useState("");
    const [announcementDate, setAnnouncementDate] = useState("");

    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        setCurrentPage("dashboard");
    };

    // =========================================================
    // STUDENT FUNCTIONS
    // =========================================================

    const addStudent = () => {

        if (!studentName || !roll || !course) {
            alert("Please enter Student Name, Roll Number and Course");
            return;
        }

        const newStudent = {
            id: Date.now(),
            name: studentName,
            roll: roll,
            course: course,
            phone: phone,
            room: studentRoom
        };

        const updatedStudents = [
            ...students,
            newStudent
        ];

        setStudents(updatedStudents);
        saveData("students", updatedStudents);

        setStudentName("");
        setRoll("");
        setCourse("");
        setPhone("");
        setStudentRoom("");

        alert("Student added successfully!");

        setCurrentPage("students");
    };

    const deleteStudent = (id) => {

        const updatedStudents = students.filter(
            student => student.id !== id
        );

        setStudents(updatedStudents);
        saveData("students", updatedStudents);
    };

    // =========================================================
    // ROOM FUNCTIONS
    // =========================================================

    const addRoom = () => {

        if (!roomNo || !capacity) {
            alert("Please enter Room Number and Capacity");
            return;
        }

        const newRoom = {
            id: Date.now(),
            roomNo: roomNo,
            capacity: Number(capacity),
            occupied: Number(occupied) || 0
        };

        const updatedRooms = [
            ...rooms,
            newRoom
        ];

        setRooms(updatedRooms);
        saveData("rooms", updatedRooms);

        setRoomNo("");
        setCapacity("");
        setOccupied("");

        alert("Room added successfully!");

        setCurrentPage("rooms");
    };

    const deleteRoom = (id) => {

        const updatedRooms = rooms.filter(
            room => room.id !== id
        );

        setRooms(updatedRooms);
        saveData("rooms", updatedRooms);
    };

    // =========================================================
    // COMPLAINT FUNCTIONS
    // =========================================================

    const addComplaint = () => {

        if (!complaintStudent || !complaintText) {
            alert("Please enter Student Name and Complaint");
            return;
        }

        const newComplaint = {
            id: Date.now(),
            student: complaintStudent,
            room: complaintRoom,
            complaint: complaintText,
            status: "Pending"
        };

        const updatedComplaints = [
            ...complaints,
            newComplaint
        ];

        setComplaints(updatedComplaints);
        saveData("complaints", updatedComplaints);

        setComplaintStudent("");
        setComplaintRoom("");
        setComplaintText("");

        alert("Complaint submitted successfully!");

        setCurrentPage("complaints");
    };

    const resolveComplaint = (id) => {

        const updatedComplaints = complaints.map(
            complaint =>
                complaint.id === id
                    ? {
                        ...complaint,
                        status: "Resolved"
                    }
                    : complaint
        );

        setComplaints(updatedComplaints);
        saveData("complaints", updatedComplaints);
    };

    const deleteComplaint = (id) => {

        const updatedComplaints = complaints.filter(
            complaint => complaint.id !== id
        );

        setComplaints(updatedComplaints);
        saveData("complaints", updatedComplaints);
    };

    // =========================================================
    // VISITOR FUNCTIONS
    // =========================================================

    const addVisitor = () => {

        if (!visitorName || !visitorStudent) {
            alert("Please enter Visitor Name and Student Name");
            return;
        }

        const newVisitor = {
            id: Date.now(),
            name: visitorName,
            student: visitorStudent,
            room: visitorRoom,
            phone: visitorPhone,
            date: visitorDate
        };

        const updatedVisitors = [
            ...visitors,
            newVisitor
        ];

        setVisitors(updatedVisitors);
        saveData("visitors", updatedVisitors);

        setVisitorName("");
        setVisitorStudent("");
        setVisitorRoom("");
        setVisitorPhone("");
        setVisitorDate("");

        alert("Visitor added successfully!");

        setCurrentPage("visitors");
    };

    const deleteVisitor = (id) => {

        const updatedVisitors = visitors.filter(
            visitor => visitor.id !== id
        );

        setVisitors(updatedVisitors);
        saveData("visitors", updatedVisitors);
    };

    // =========================================================
    // FEE FUNCTIONS
    // =========================================================

    const addFee = () => {

        if (!feeStudent || !feeAmount) {
            alert("Please enter Student Name and Amount");
            return;
        }

        const newFee = {
            id: Date.now(),
            student: feeStudent,
            amount: Number(feeAmount),
            status: "Pending"
        };

        const updatedFees = [
            ...fees,
            newFee
        ];

        setFees(updatedFees);
        saveData("fees", updatedFees);

        setFeeStudent("");
        setFeeAmount("");

        alert("Fee added successfully!");

        setCurrentPage("fees");
    };

    const markPaid = (id) => {

        const updatedFees = fees.map(
            fee =>
                fee.id === id
                    ? {
                        ...fee,
                        status: "Paid"
                    }
                    : fee
        );

        setFees(updatedFees);
        saveData("fees", updatedFees);
    };

    const deleteFee = (id) => {

        const updatedFees = fees.filter(
            fee => fee.id !== id
        );

        setFees(updatedFees);
        saveData("fees", updatedFees);
    };

    // =========================================================
    // ANNOUNCEMENT FUNCTIONS
    // =========================================================

    const addAnnouncement = () => {

        if (!announcementTitle || !announcementMessage) {
            alert("Please enter Announcement Title and Message");
            return;
        }

        const newAnnouncement = {
            id: Date.now(),
            title: announcementTitle,
            message: announcementMessage,
            date: announcementDate
        };

        const updatedAnnouncements = [
            ...announcements,
            newAnnouncement
        ];

        setAnnouncements(updatedAnnouncements);
        saveData("announcements", updatedAnnouncements);

        setAnnouncementTitle("");
        setAnnouncementMessage("");
        setAnnouncementDate("");

        alert("Announcement posted successfully!");

        setCurrentPage("announcements");
    };

    const deleteAnnouncement = (id) => {

        const updatedAnnouncements =
            announcements.filter(
                announcement =>
                    announcement.id !== id
            );

        setAnnouncements(updatedAnnouncements);
        saveData(
            "announcements",
            updatedAnnouncements
        );
    };

    // =========================================================
    // DASHBOARD VALUES
    // =========================================================

    const pendingComplaints =
        complaints.filter(
            item => item.status === "Pending"
        ).length;

    const pendingFees =
        fees.filter(
            item => item.status === "Pending"
        ).length;

    // =========================================================
    // LOGIN PAGE
    // =========================================================

    if (!isLoggedIn) {

        return (
            <Login
                onLogin={() => setIsLoggedIn(true)}
            />
        );
    }

    // =========================================================
    // STUDENT DETAILS PAGE
    // =========================================================

    if (currentPage === "students") {

        return (
            <div className="app">

                <header>

                    <h1>👨‍🎓 Student Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Registered Students ({students.length})
                    </h2>

                    <div className="list">

                        {students.length === 0 ? (

                            <p>
                                No students added yet.
                            </p>

                        ) : (

                            students.map(
                                (student, index) => (

                                    <div
                                        className="item"
                                        key={student.id}
                                    >

                                        <div>

                                            <h3>
                                                Student {index + 1}
                                            </h3>

                                            <p>
                                                <b>Name:</b>{" "}
                                                {student.name}
                                            </p>

                                            <p>
                                                <b>Roll Number:</b>{" "}
                                                {student.roll}
                                            </p>

                                            <p>
                                                <b>Course:</b>{" "}
                                                {student.course}
                                            </p>

                                            <p>
                                                <b>Phone:</b>{" "}
                                                {student.phone ||
                                                    "Not provided"}
                                            </p>

                                            <p>
                                                <b>Room:</b>{" "}
                                                {student.room ||
                                                    "Not allocated"}
                                            </p>

                                        </div>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                deleteStudent(
                                                    student.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // ROOM DETAILS PAGE
    // =========================================================

    if (currentPage === "rooms") {

        return (
            <div className="app">

                <header>

                    <h1>🚪 Room Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Registered Rooms ({rooms.length})
                    </h2>

                    <div className="list">

                        {rooms.length === 0 ? (

                            <p>
                                No rooms added yet.
                            </p>

                        ) : (

                            rooms.map(
                                (room, index) => (

                                    <div
                                        className="item"
                                        key={room.id}
                                    >

                                        <div>

                                            <h3>
                                                Room {index + 1}
                                            </h3>

                                            <p>
                                                <b>Room Number:</b>{" "}
                                                {room.roomNo}
                                            </p>

                                            <p>
                                                <b>Capacity:</b>{" "}
                                                {room.capacity}
                                            </p>

                                            <p>
                                                <b>Occupied:</b>{" "}
                                                {room.occupied}
                                            </p>

                                            <p>
                                                <b>Available:</b>{" "}
                                                {room.capacity -
                                                    room.occupied}
                                            </p>

                                        </div>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                deleteRoom(
                                                    room.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // COMPLAINT DETAILS PAGE
    // =========================================================

    if (currentPage === "complaints") {

        return (
            <div className="app">

                <header>

                    <h1>📝 Complaint Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Complaints ({complaints.length})
                    </h2>

                    <div className="list">

                        {complaints.length === 0 ? (

                            <p>
                                No complaints submitted yet.
                            </p>

                        ) : (

                            complaints.map(
                                (item, index) => (

                                    <div
                                        className="item"
                                        key={item.id}
                                    >

                                        <div>

                                            <h3>
                                                Complaint {index + 1}
                                            </h3>

                                            <p>
                                                <b>Student:</b>{" "}
                                                {item.student}
                                            </p>

                                            <p>
                                                <b>Room:</b>{" "}
                                                {item.room ||
                                                    "Not provided"}
                                            </p>

                                            <p>
                                                <b>Complaint:</b>{" "}
                                                {item.complaint}
                                            </p>

                                            <p>
                                                <b>Status:</b>{" "}
                                                {item.status}
                                            </p>

                                        </div>

                                        <div>

                                            {item.status ===
                                                "Pending" && (

                                                    <button
                                                        onClick={() =>
                                                            resolveComplaint(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Resolve
                                                    </button>
                                                )}

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    deleteComplaint(
                                                        item.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // VISITOR DETAILS PAGE
    // =========================================================

    if (currentPage === "visitors") {

        return (
            <div className="app">

                <header>

                    <h1>👥 Visitor Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Registered Visitors ({visitors.length})
                    </h2>

                    <div className="list">

                        {visitors.length === 0 ? (

                            <p>
                                No visitors added yet.
                            </p>

                        ) : (

                            visitors.map(
                                (visitor, index) => (

                                    <div
                                        className="item"
                                        key={visitor.id}
                                    >

                                        <div>

                                            <h3>
                                                Visitor {index + 1}
                                            </h3>

                                            <p>
                                                <b>Visitor Name:</b>{" "}
                                                {visitor.name}
                                            </p>

                                            <p>
                                                <b>Visiting Student:</b>{" "}
                                                {visitor.student}
                                            </p>

                                            <p>
                                                <b>Room:</b>{" "}
                                                {visitor.room ||
                                                    "Not provided"}
                                            </p>

                                            <p>
                                                <b>Phone:</b>{" "}
                                                {visitor.phone ||
                                                    "Not provided"}
                                            </p>

                                            <p>
                                                <b>Date:</b>{" "}
                                                {visitor.date ||
                                                    "Not provided"}
                                            </p>

                                        </div>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                deleteVisitor(
                                                    visitor.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // FEE DETAILS PAGE
    // =========================================================

    if (currentPage === "fees") {

        return (
            <div className="app">

                <header>

                    <h1>💰 Fee Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Fee Records ({fees.length})
                    </h2>

                    <div className="list">

                        {fees.length === 0 ? (

                            <p>
                                No fee records added yet.
                            </p>

                        ) : (

                            fees.map(
                                (fee, index) => (

                                    <div
                                        className="item"
                                        key={fee.id}
                                    >

                                        <div>

                                            <h3>
                                                Fee Record {index + 1}
                                            </h3>

                                            <p>
                                                <b>Student:</b>{" "}
                                                {fee.student}
                                            </p>

                                            <p>
                                                <b>Amount:</b>{" "}
                                                ₹{fee.amount}
                                            </p>

                                            <p>
                                                <b>Status:</b>{" "}
                                                {fee.status}
                                            </p>

                                        </div>

                                        <div>

                                            {fee.status ===
                                                "Pending" && (

                                                    <button
                                                        onClick={() =>
                                                            markPaid(
                                                                fee.id
                                                            )
                                                        }
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    deleteFee(
                                                        fee.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // ANNOUNCEMENT DETAILS PAGE
    // =========================================================

    if (currentPage === "announcements") {

        return (
            <div className="app">

                <header>

                    <h1>📢 Announcement Details</h1>

                    <button
                        onClick={() =>
                            setCurrentPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </header>

                <section>

                    <h2>
                        Announcements ({announcements.length})
                    </h2>

                    <div className="list">

                        {announcements.length === 0 ? (

                            <p>
                                No announcements posted yet.
                            </p>

                        ) : (

                            announcements.map(
                                (item, index) => (

                                    <div
                                        className="item"
                                        key={item.id}
                                    >

                                        <div>

                                            <h3>
                                                Announcement{" "}
                                                {index + 1}
                                            </h3>

                                            <p>
                                                <b>Title:</b>{" "}
                                                {item.title}
                                            </p>

                                            <p>
                                                <b>Message:</b>{" "}
                                                {item.message}
                                            </p>

                                            <p>
                                                <b>Date:</b>{" "}
                                                {item.date ||
                                                    "Not provided"}
                                            </p>

                                        </div>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                deleteAnnouncement(
                                                    item.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }

    // =========================================================
    // MAIN DASHBOARD
    // =========================================================

    return (
        <div className="app">

            {/* ================= HEADER ================= */}

            <header>

                <h1>
                    🏠 Hostel Management System
                </h1>

            </header>


            {/* ================= SUMMARY CARDS ================= */}

            <div className="dashboard">

                <div
                    className="card"
                    onClick={() =>
                        setCurrentPage("students")
                    }
                    style={{ cursor: "pointer" }}
                >
                    <h2>
                        {students.length}
                    </h2>

                    <p>
                        👨‍🎓 Students
                    </p>
                </div>


                <div
                    className="card"
                    onClick={() =>
                        setCurrentPage("rooms")
                    }
                    style={{ cursor: "pointer" }}
                >
                    <h2>
                        {rooms.length}
                    </h2>

                    <p>
                        🚪 Rooms
                    </p>
                </div>


                <div
                    className="card"
                    onClick={() =>
                        setCurrentPage("complaints")
                    }
                    style={{ cursor: "pointer" }}
                >
                    <h2>
                        {pendingComplaints}
                    </h2>

                    <p>
                        📝 Pending Complaints
                    </p>
                </div>


                <div
                    className="card"
                    onClick={() =>
                        setCurrentPage("fees")
                    }
                    style={{ cursor: "pointer" }}
                >
                    <h2>
                        {pendingFees}
                    </h2>

                    <p>
                        💰 Pending Fees
                    </p>
                </div>

            </div>


            {/* ================= MODULE NAVIGATION ================= */}

            <section>

                <h2>
                    📋 Management Modules
                </h2>

                <div className="dashboard">

                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("students")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>👨‍🎓</h2>
                        <p>Student Details</p>
                    </div>


                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("rooms")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>🚪</h2>
                        <p>Room Details</p>
                    </div>


                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("complaints")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>📝</h2>
                        <p>Complaint Details</p>
                    </div>


                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("visitors")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>👥</h2>
                        <p>Visitor Details</p>
                    </div>


                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("fees")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>💰</h2>
                        <p>Fee Details</p>
                    </div>


                    <div
                        className="card"
                        onClick={() =>
                            setCurrentPage("announcements")
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <h2>📢</h2>
                        <p>Announcement Details</p>
                    </div>

                </div>

            </section>


            {/* =====================================================
                STUDENT MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    👨‍🎓 Student Management
                </h2>

                <div className="form">

                    <input
                        placeholder="Student Name"
                        value={studentName}
                        onChange={e =>
                            setStudentName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Roll Number"
                        value={roll}
                        onChange={e =>
                            setRoll(e.target.value)
                        }
                    />

                    <input
                        placeholder="Course"
                        value={course}
                        onChange={e =>
                            setCourse(e.target.value)
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={phone}
                        onChange={e =>
                            setPhone(e.target.value)
                        }
                    />

                    <input
                        placeholder="Room Number"
                        value={studentRoom}
                        onChange={e =>
                            setStudentRoom(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addStudent}>
                        Add Student
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("students")
                        }
                    >
                        View Student Details
                    </button>

                </div>

            </section>


            {/* =====================================================
                ROOM MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    🚪 Room Management
                </h2>

                <div className="form">

                    <input
                        placeholder="Room Number"
                        value={roomNo}
                        onChange={e =>
                            setRoomNo(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={e =>
                            setCapacity(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Occupied"
                        value={occupied}
                        onChange={e =>
                            setOccupied(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addRoom}>
                        Add Room
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("rooms")
                        }
                    >
                        View Room Details
                    </button>

                </div>

            </section>


            {/* =====================================================
                COMPLAINT MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    📝 Complaint Management
                </h2>

                <div className="form">

                    <input
                        placeholder="Student Name"
                        value={complaintStudent}
                        onChange={e =>
                            setComplaintStudent(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Room Number"
                        value={complaintRoom}
                        onChange={e =>
                            setComplaintRoom(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Complaint"
                        value={complaintText}
                        onChange={e =>
                            setComplaintText(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addComplaint}>
                        Submit Complaint
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("complaints")
                        }
                    >
                        View Complaint Details
                    </button>

                </div>

            </section>


            {/* =====================================================
                VISITOR MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    👥 Visitor Management
                </h2>

                <div className="form">

                    <input
                        placeholder="Visitor Name"
                        value={visitorName}
                        onChange={e =>
                            setVisitorName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Student Name"
                        value={visitorStudent}
                        onChange={e =>
                            setVisitorStudent(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Room Number"
                        value={visitorRoom}
                        onChange={e =>
                            setVisitorRoom(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={visitorPhone}
                        onChange={e =>
                            setVisitorPhone(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="date"
                        value={visitorDate}
                        onChange={e =>
                            setVisitorDate(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addVisitor}>
                        Add Visitor
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("visitors")
                        }
                    >
                        View Visitor Details
                    </button>

                </div>

            </section>


            {/* =====================================================
                FEE MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    💰 Fee Management
                </h2>

                <div className="form">

                    <input
                        placeholder="Student Name"
                        value={feeStudent}
                        onChange={e =>
                            setFeeStudent(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={feeAmount}
                        onChange={e =>
                            setFeeAmount(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addFee}>
                        Add Fee
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("fees")
                        }
                    >
                        View Fee Details
                    </button>

                </div>

            </section>


            {/* =====================================================
                ANNOUNCEMENT MANAGEMENT
            ===================================================== */}

            <section>

                <h2>
                    📢 Hostel Announcements
                </h2>

                <div className="form">

                    <input
                        placeholder="Announcement Title"
                        value={announcementTitle}
                        onChange={e =>
                            setAnnouncementTitle(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Message"
                        value={announcementMessage}
                        onChange={e =>
                            setAnnouncementMessage(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="date"
                        value={announcementDate}
                        onChange={e =>
                            setAnnouncementDate(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={addAnnouncement}>
                        Post Announcement
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage("announcements")
                        }
                    >
                        View Announcement Details
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer>

                <button onClick={logout}>
                    Logout
                </button>

            </footer>

        </div>
    );
}

export default App;