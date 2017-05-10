

/**
 * SocketUtil.js
 *
 * @author Anand Pahuja
 */

/*jshint node:true */

var _io;

exports.init = function(io) {
    'use strict';
    _io = io;
};

// Broadcast and event to all open sockets
exports.broadcast = function(event, message) {
    'use strict';

    _io.emit(event, message);
};