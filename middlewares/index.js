var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

module.exports = (app) => {
    
    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

};