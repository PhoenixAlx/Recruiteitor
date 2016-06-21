var jwt = require('jsonwebtoken');
var useragent = require('useragent');
var express=require('express');

var config=require('./config');

var database=require('./database');
var db=database.db;
var polls=database.polls;

module.exports=function(app){
    
// Rutas
app.get('/:id', function(req, res) {
    var ses = req.session;

    if (typeof polls[req.params.id] === 'undefined') {
        res.status(404).send('ID ' + req.params.id + ' not found');
    } else {
        var agent = useragent.parse(req.headers['user-agent']);
        var dev_id = (agent.toAgent() +
            "_" + agent.os.toString() + "_" +
            agent.device.toString()).replace(/\s/g, "");
        var value = "ID:" + req.params.id + "_" + dev_id;

        // Crea el token
        var token = jwt.sign(value, config.secret);
        ses.token = token;

        var poll_collection = polls[req.params.id];
        poll_collection.insert({
            dev_id: dev_id,
            token: token
        });
        db.saveDatabase();

	var payload = {
	    success: true,
	    message: 'Token creado',
	    token: token,
	    poll: polls[req.params.id]
        };

	console.log( req.params );
        res.json( payload );
	    
    }
});


app.get('/:id/p/:f', function(req, res) {
    var ses = req.session;

    if (typeof polls[req.params.id] === 'undefined') {
        res.status(404).send('ID ' + req.params.id + ' not found');
    } else {
        var agent = useragent.parse(req.headers['user-agent']);
        var dev_id = (agent.toAgent() +
            "_" + agent.os.toString() + "_" +
            agent.device.toString()).replace(/\s/g, "");
        var value = "ID:" + req.params.id + "_" + dev_id;

        // Crea el token
        var token = jwt.sign(value, config.secret);
        ses.token = token;

        var poll_collection = polls[req.params.id];
        poll_collection.insert({
            dev_id: dev_id,
            token: token
        });
        db.saveDatabase();

	console.log( req.params );
	res.header("Content-Type", "application/javascript");
	res.send( req.params.f + "( " + JSON.stringify(  polls[req.params.id] ) + ")")
	    
    }
});

app.put('/:id/:token/:respuesta', function(req, res) {
    if (typeof polls[req.params.id] === 'undefined') {
        res.status(404).send('ID ' + req.params.id + ' not found');
    } else {
        var poll_collection = polls[req.params.id];
        console.log(req.params.token);
        var dev_id = poll_collection.find({
            'token': req.params.token
        });
        res.json({
            success: true,
            message: 'token correcto'
        });
    }
});

// Rutas protegidas
var api = express.Router();
app.use('/:id', api);

// Middleware para verficiar el token
api.use(function(req, res, next) {
    // Obtener el token
    var ses = req.session;

    // Verificar el token
    if (ses.token) {
        jwt.verify(ses.token, config.secret, function(err, value) {
            if (err) {
                return res.json(403, {
                    success: false,
                    message: 'Fallo al verificar el token. Acceso no autorizado'
                });
            } else {
                // Se pasa el token con la solicitud
                req.value = value;
                next();
            }
        });
    } else {
        return res.status(404).send({
            success: false,
            message: 'Token no encontrado.'
        });
    }
});

api.get('/check', function(req, res) {
    res.json(req.value);
});
};
