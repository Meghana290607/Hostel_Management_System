const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect("mongodb://127.0.0.1:27017/hostel_management")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });


// ===============================
// STUDENT MODEL
// ===============================

const Student = mongoose.model("Student", {
    name: String,
    roll: String,
    course: String,
    phone: String,
    room: String
});


// Add Student
app.post("/students", async (req, res) => {

    const student = new Student(req.body);

    await student.save();

    res.json(student);
});


// Get Students
app.get("/students", async (req, res) => {

    const students = await Student.find();

    res.json(students);
});


// Delete Student
app.delete("/students/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student deleted"
    });
});


// ===============================
// ROOM MODEL
// ===============================

const Room = mongoose.model("Room", {
    roomNo: String,
    capacity: Number,
    occupied: Number
});


// Add Room
app.post("/rooms", async (req, res) => {

    const room = new Room(req.body);

    await room.save();

    res.json(room);
});


// Get Rooms
app.get("/rooms", async (req, res) => {

    const rooms = await Room.find();

    res.json(rooms);
});


// Delete Room
app.delete("/rooms/:id", async (req, res) => {

    await Room.findByIdAndDelete(req.params.id);

    res.json({
        message: "Room deleted"
    });
});


// ===============================
// COMPLAINT MODEL
// ===============================

const Complaint = mongoose.model("Complaint", {
    student: String,
    room: String,
    complaint: String,
    status: {
        type: String,
        default: "Pending"
    }
});


// Add Complaint
app.post("/complaints", async (req, res) => {

    const complaint = new Complaint(req.body);

    await complaint.save();

    res.json(complaint);
});


// Get Complaints
app.get("/complaints", async (req, res) => {

    const complaints = await Complaint.find();

    res.json(complaints);
});


// Update Complaint
app.put("/complaints/:id", async (req, res) => {

    const complaint =
        await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(complaint);
});


// Delete Complaint
app.delete("/complaints/:id", async (req, res) => {

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
        message: "Complaint deleted"
    });
});


// ===============================
// VISITOR MODEL
// ===============================

const Visitor = mongoose.model("Visitor", {
    name: String,
    student: String,
    room: String,
    phone: String,
    date: String
});


// Add Visitor
app.post("/visitors", async (req, res) => {

    const visitor = new Visitor(req.body);

    await visitor.save();

    res.json(visitor);
});


// Get Visitors
app.get("/visitors", async (req, res) => {

    const visitors = await Visitor.find();

    res.json(visitors);
});


// Delete Visitor
app.delete("/visitors/:id", async (req, res) => {

    await Visitor.findByIdAndDelete(req.params.id);

    res.json({
        message: "Visitor deleted"
    });
});


// ===============================
// FEE MODEL
// ===============================

const Fee = mongoose.model("Fee", {
    student: String,
    amount: Number,
    status: {
        type: String,
        default: "Pending"
    }
});


// Add Fee
app.post("/fees", async (req, res) => {

    const fee = new Fee(req.body);

    await fee.save();

    res.json(fee);
});


// Get Fees
app.get("/fees", async (req, res) => {

    const fees = await Fee.find();

    res.json(fees);
});


// Update Fee
app.put("/fees/:id", async (req, res) => {

    const fee =
        await Fee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(fee);
});


// Delete Fee
app.delete("/fees/:id", async (req, res) => {

    await Fee.findByIdAndDelete(req.params.id);

    res.json({
        message: "Fee deleted"
    });
});


// ===============================
// ANNOUNCEMENT MODEL
// ===============================

const Announcement = mongoose.model("Announcement", {
    title: String,
    message: String,
    date: String
});


// Add Announcement
app.post("/announcements", async (req, res) => {

    const announcement =
        new Announcement(req.body);

    await announcement.save();

    res.json(announcement);
});


// Get Announcements
app.get("/announcements", async (req, res) => {

    const announcements =
        await Announcement.find();

    res.json(announcements);
});


// Delete Announcement
app.delete("/announcements/:id", async (req, res) => {

    await Announcement.findByIdAndDelete(req.params.id);

    res.json({
        message: "Announcement deleted"
    });
});


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {

    res.send("Hostel Management System API is running");

});


// ===============================
// SERVER
// ===============================

app.listen(5000, () => {

    console.log("Server running at http://localhost:5000");

});