const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/myprojectDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the Project Schema and Model
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
});
const Project = mongoose.model("Project", projectSchema);

// Define the User Schema and Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// REST API Routes

// Get All Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
});

// Create a New User
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ statusCode: 201, data: user, message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ statusCode: 400, message: "Bad Request", error: err.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ statusCode: 200, data: users, message: "Success" });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});