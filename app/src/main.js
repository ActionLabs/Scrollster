/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var StageView = require('views/StageView');
    var Director = require('tools/Director');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var stageView = new StageView();
    var director = new Director();

    var actorDescriptions = {
        'Demo Actor': {
            type: 'image',
            content: 'content/images/famous_logo.png',
            zIndex: 10,
            properties: {
                fontSize: '2em',
                padding: '.5em',
                backfaceVisibility: 'visible'
            },
            size: [300, 300],
            position: [150, 150]
        }
    };

    var actionDescriptions = [
        {
            actor: 'Demo Actor',
            start: 0,
            stop: 1000,
            type: 'rotateTo',
            properties: {
                axis: 'y',
                angleInDegrees: 540
            }
        },
        {
            actor: 'Demo Actor',
            start: 0,
            stop: 600,
            type: 'position',
            properties: {
                scaleX: 0,
                scaleY: -1
            }
        },
        {
            actor: 'Demo Actor',
            start: 600,
            stop: 1000,
            type: 'moveTo',
            properties: {
                location: [720, 450]
            }
        },
        {
            actor: 'Demo Actor',
            start: 0,
            stop: 200,
            type: 'opacity',
            properties: {}
        }
    ];

    director.populateStage(stageView, actorDescriptions, actionDescriptions);

    mainContext.add(stageView);
});
