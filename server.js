import express from "express";
import colors from "colors";
 import path from "path";

import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/database.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import teacherRoutes from "./routes/teacherRouters.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import admissionRoutes from "./routes/addmissionRoutes.js";
import errorHandler from "./middleware/errorHandlerMiddleware.js";

const app = express(); 

dotenv.config();



const PORT = process.env.PORT || 8080;


connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/users', userRoutes); // Use the user routes under the '/api' prefix
app.use('/api/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/exams', examRoutes);
app.use('/api/admissions', admissionRoutes);

app.use('/api/notifications', notificationRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send({
      message: "welcome  express",
    });
  });

  app.listen(PORT, () => {
    console.log(
      `Server is Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white
    );
  });
  