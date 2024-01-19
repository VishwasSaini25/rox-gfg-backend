import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";

//configuring middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

import initializationRoutes from "./routes/intitializeDatabse.js";
import transactionsRoutes from "./routes/transaction.js";
import statisticsRoutes from "./routes/statistics.js";
import chartsRoutes from "./routes/chart.js";
import combinedDataRoutes from "./routes/combinedData.js"; 
import initializationStatus from "./models/initializationStatus.js";
//defining Routes
app.use("/api/initialize-database", initializationRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/charts", chartsRoutes);
app.use("/api/combined-data", combinedDataRoutes);


//starting server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server started at ${process.env.PORT || 8000} with mongodb`)
    );
    const status = await initializationStatus.findOne();
    if (!status || !status.initialized) {
      await axios.get('http://localhost:8000/api/initialize-database');
      if (!status) {
        // If the document doesn't exist, create it
        await initializationStatus.create({ initialized: true });
      } else {
        // If the document exists, update the flag
        await initializationStatus.updateOne({}, { initialized: true });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
startServer();