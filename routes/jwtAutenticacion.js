const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const validarInformacion = require("../middleware/validarInformacion");
const autorizacion = require("../middleware/autorizacion");

//registro

router.post("/registro", validarInformacion, async (req, res) => {
    //estructuracion del cuerpo (nombre, email, contraseña)
    const { email, name, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        //Verificar que el usuario que registra ya existe
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        //Encriptación de la contraseña
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //Ingreso de nuevo usuario y registro de la base de datos
        let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        //Implementacion de token para seguridad de inicio
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//Ruta de Login 

router.post("/login", validarInformacion, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
       

        if (user.rows.length === 0) {
            return res.status(401).json("informacion invalida");
        }

        //Validacion de contraseña ingresa igual como el registor de la base de datos 

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password );
      
          if (!validPassword) {
            return res.status(401).json("Contraseña Incorrecta");
          }

          //generacion de token una vez comprobado 

        const jwtToken = jwtGenerator(user.rows[0].user_id);
         return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/verificacion", autorizacion, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
module.exports = router;


