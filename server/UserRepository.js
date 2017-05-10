

/**
 * UserRepository.js
 *
 * @author Anand Pahuja
 */

/*jshint node:true */

var _ = require('underscore');

var users = [
    {
        'id': 'AM',
        'name': 'Amadeus Mozart'
    },
    {
        'id': 'AR',
        'name': 'A. R. Rahman'
    },
    {
        'id': 'AY',
        'name': 'Alka Yagnik'
    },
    {
        'id': 'BL',
        'name': 'Bappi Lahiri'
    },
    {
        'id': 'BS',
        'name': 'Bruce Springsteen'
    },
    {
        'id': 'DS',
        'name': 'Donna Summer'
    },
    {
        'id': 'EC',
        'name': 'Eric Clapton'
    },
    {
        'id': 'EJ',
        'name': 'Elton John'
    },
    {
        'id': 'EP',
        'name': 'Elvis Presley'
    },
    {
        'id': 'GH',
        'name': 'George Harrison'
    },
    {
        'id': 'JH',
        'name': 'Jimi Hendrix'
    },
    {
        'id': 'JL',
        'name': 'John Lennon'
    },
    {
        'id': 'JS',
        'name': 'Jagjit Singh'
    },
    {
        'id': 'KG',
        'name': 'Kunal Ganjawala'
    },
    {
        'id': 'KK',
        'name': 'Kishore Kumar'
    },
    {
        'id': 'LM',
        'name': 'Lata Mangeshkar'
    },
    {
        'id': 'MD',
        'name': 'Madonna'
    },
    {
        'id': 'MJ',
        'name': 'Michael Jackson'
    },
    {
        'id': 'MR',
        'name': 'Mohammed Rafi'
    },
    {
        'id': 'ND',
        'name': 'Neil Diamond'
    },
    {
        'id': 'PM',
        'name': 'Paul McCartney'
    },
    {
        'id': 'PS',
        'name': 'Paul Simon'
    },
    {
        'id': 'RB',
        'name': 'Rahul Dev Burman'
    },
    {
        'id': 'RS',
        'name': 'Ringo Starr'
    },
    {
        'id': 'RW',
        'name': 'Roger Waters'
    },
    {
        'id': 'SG',
        'name': 'Shreya Ghoshal'
    },
    {
        'id': 'SM',
        'name': 'Shankar Mahadevan'
    },
    {
        'id': 'SN',
        'name': 'Sonu Nigam'
    },
    {
        'id': 'SW',
        'name': 'Stevie Wonder'
    },
    {
        'id': 'UN',
        'name': 'Udit Narayan'
    }
];

exports.getAll = function() {
    'use strict';
    return users;
};

exports.get = function(id) {
    'use strict';
    return _.where(users, {id: id});
};