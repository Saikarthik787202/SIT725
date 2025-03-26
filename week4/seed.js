const mongoose = require("mongoose");
const Project = require("./models/Project"); // Ensure this path is correct

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/myprojectDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Seed Data
const seedProjects = async () => {
  const projects = [
    {
      title: "Kitten 1",
      image: "images/kitten-1.jpg",
      link: "About Kitten 1",
      description: "Fluffy and adorable kitten",
    },
    {
      title: "Kitten 2",
      image: "images/kitten-2.jpg",
      link: "About Kitten 2",
      description: "Loves to nap in sunbeams",
    },
    {
        title: "Kitten 3",
        image: "images/kitten-2.jpg",
        link: "About Kitten 3",
        description: "Loves to nap in nightbeams",
      },
  ];

  try {
    console.log("Inserting projects:", projects);
    await Project.insertMany(projects);
    console.log("Seed data added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedProjects();