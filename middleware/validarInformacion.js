module.exports = function (req, res, next) {
    const { email, name, password } = req.body;

    function validarEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/registro") {
        console.log(!email.length);
        if (![email, name, password].every(Boolean)) {
            return res.json("Credenciales incompletas");
        } else if (!validarEmail(email)) {
            return res.json("Email invalido");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.json("Faltan Credenciales");
        } else if (!validarEmail(email)) {
            return res.json("Email invalido");
        }
    }

    next();
};