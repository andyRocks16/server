
/**
 * server.js
 *
 * @author Anand Pahuja
 */

/*jshint node:true */

var _ = require('underscore'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    socketUtil = require('./SocketUtil.js'),
    userRepository = require('./UserRepository.js'),
    instrumentRepository = require('./InstrumentRepository.js'),
    orderRepository = require('./OrderRepository.js'),
    bodyParser = require('body-parser');

// -----------------------------------------------------------------------------
// Web Server Setup
// -----------------------------------------------------------------------------

// Add middleware to parse the POST data of the body
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));

// Start listening on port 8080
server.listen(8080);
console.log('Listening on port 8080');

// -----------------------------------------------------------------------------
// Socket.io Setup
// -----------------------------------------------------------------------------

// Log socket connections and disconnections
io.sockets.on('connection', function(socket) {
    'use strict';
    console.log(socket.id + ' connected');

    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
    });
});

socketUtil.init(io);

// -----------------------------------------------------------------------------
// RESTful Service Setup
// -----------------------------------------------------------------------------

// ----- CORS Setup -----

function setAcceptsHeader(req, res, next) {
    'use strict';

    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}

app.options('*', function (req, res) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).end();
});

// ----- User -----
// id: String
// name: String

// Get all users
app.get('/users', setAcceptsHeader, function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(userRepository.getAll());
});

// ----- Instrument -----
// symbol: String
// name: String
// lastTrade: float

// Get all instruments
app.get('/instruments', setAcceptsHeader, function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(instrumentRepository.getAll());
});

// ----- Order -----
// id: int
// creationTime: date,
// side: 'Buy' | 'Sell'
// symbol: String
// quantity: int
// quantityPlaced: int
// quantityExecuted: int
// limitPrice: float
// priority: int  [1 (Low) - 100 (High)]
// status: 'New' | 'Placed' | 'Executed' | 'Canceled'
// traderId: String

// Create order
// Expects an order in the request body with the following properties filled:
// {
//   "side": "Buy" | "Sell",
//   "symbol": String,
//   "quantity": int,
//   "limitPrice": float,
//   "traderId": String
// }
app.post('/orders', setAcceptsHeader, function (req, res) {
    'use strict';
    var orderParams = req.body;
    var order = orderRepository.persist(orderParams);

    // Broadcast order to clients
    socketUtil.broadcast({orderMessage: 'orderCreatedEvent', order});
    console.log("broadcasted")
    // Send response to caller
    res.status(201);
    res.setHeader('Content-Type', 'application/json');
    return res.send(order);
});

// Get all orders
app.get('/orders', setAcceptsHeader, function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(orderRepository.getAll());
});

// Delete all orders
app.delete('/orders', setAcceptsHeader, function (req, res) {
    'use strict';
    orderRepository.deleteAll();

    // Broadcast deleted eveent to clients
    socketUtil.broadcast({orderMessage: 'allOrdersDeletedEvent'});

    // Send response to caller
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end();
});

// -----------------------------------------------------------------------------
// Periodic Order Processing
// -----------------------------------------------------------------------------
setInterval(function() {
    'use strict';

    var orders = orderRepository.getAll();
    _.each(orders, function(order) {
        order.processTick();
    });
}, 2000);