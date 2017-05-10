

/**
 * OrderRepository.js
 *
 * @author Anand Pahuja
 */

/*jshint node:true */

var _     = require('underscore'),
    Order = require('./Order.js');

var orders = [];

exports.persist = function(orderParams) {
    'use strict';
    var order = new Order(orderParams);
    orders.push(order);
    return order;
};

exports.getAll = function() {
    'use strict';
    return orders;
};

exports.find = function(properties) {
    'use strict';
    _.where(orders, properties);
};

exports.cancel = function(id) {
    'use strict';
    var matchedOrders = _.where(orders, {id: id});
    if (matchedOrders.length === 1) {
        matchedOrders[0].status = 'Canceled';
    }
};

exports.deleteAll = function() {
    'use strict';
    orders.length = 0;
};