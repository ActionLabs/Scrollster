/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var WorldScrollView = require('views/WorldScrollView');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var worldScrollView = new WorldScrollView();

    mainContext.add(worldScrollView);
});
