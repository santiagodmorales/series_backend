const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');


dotenv.config();
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', routes);

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true}, (error, response) => {
    if (error) {
        return console.log(`Error al conectar a la base de datos ${error}`);
    }
    console.log("Conexion a la base de datos exitosa.");
    app.listen(process.env.PORT,(error)=>{
        if(error){
            console.log("Ha ocurrido un error");
        }
        console.log(`Corriendo en puerto ${process.env.PORT}`);
});

});