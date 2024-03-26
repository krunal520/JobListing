require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");

 
const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Db Connected!'))
    .catch((error) => console.log("Db Failed to connect", error))



app.get("/api/health", (req, res) => {
    console.log("hey health");
    res.json({
        service: "Backend Server",
        status: "active",
        time: new Date(),
    })
})

app.use("/api/v1/auth", authRoute); // middle wares
app.use("/api/v1/job", jobRoute);

app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`backend is running at port ${PORT}`);
});

