const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// Página registro
router.get("/", (req,res)=>{
    res.render("register");
});

// Peticion registro
router.post("/", async (req,res)=>{

    const {usuario, contrasena} = req.body;

    // Validación de la contraseña igual que tu PHP
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)?(?=.*[!@#$%^&*]).{6,}$/;

    if(!regExp.test(contrasena)){
        return res.send("La contraseña debe tener 6 caracteres y un símbolo");
    }

    // Verificar que el usuario no exista
    const [rows] = await db.query("SELECT * FROM usuarios WHERE nombre_usuario=?",[usuario]);

    if(rows.length > 0){
        return res.send("El nombre ya está registrado");
    }

    // Crear hash
    const hash = await bcrypt.hash(contrasena, 10);

    await db.query(
        "INSERT INTO usuarios(email,password) VALUES(?,?)",
        [usuario, hash]
    )

    // Listo
    res.redirect("/login");
});

module.exports = router;
