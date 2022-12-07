const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Rutas

app.use("/autenticacion", require("./routes/jwtAutenticacion"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () =>{
    console.log("server is running in port 5000")
});

