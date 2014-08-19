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
        Ground: {
            type: 'image',
            content: 'content/images/ground.jpg',
            zIndex: 3,
            properties: {
            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Sky1: {
            type: 'image',
            content: 'content/images/sky1.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Sky2: {
            type: 'image',
            content: 'content/images/sky2.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Balloon: {
            type: 'image',
            content: 'content/images/balloon_red.png',
            zIndex: 14,
            properties: {

            },
            size: [20, 27],
            position: [150, 400]
        },
        Eagle: {
            type: 'image',
            content: 'content/images/eagle.png',
            zIndex: 13,
            properties: {

            },
            size: [64, 44],
            position: [250, 300]
        }
    };

    var actionDescriptions = [
        // Balloon movement
        {
            actor: 'Balloon',
            start: 0,
            stop: 1000,
            type: 'moveTo',
            properties: {
                location: [150, 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 1000,
            stop: 1000,
            type: 'moveTo',
            properties: {
                location: [150, window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 1000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: [150, 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 2000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: [150, window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 2000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: [150, 0],
                curve: 'easeIn'
            }
        },

        // Background changes
        {
            actor: 'Ground',
            start: 1000,
            stop: 1000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Sky1',
            start: 1000,
            stop: 1000,
            type: 'opacity',
            properties: {
            }
        },
        {
            actor: 'Sky1',
            start: 2000,
            stop: 2000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Sky2',
            start: 2000,
            stop: 2000,
            type: 'opacity',
            properties: {
            }
        },
        {
            actor: 'Sky2',
            start: 3000,
            stop: 3000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },

        // Eagle
        {
            actor: 'Eagle',
            start: 1000,
            stop: 1000,
            type: 'opacity',
            properties: {
            }
        },
        {
            actor: 'Eagle',
            start: 1000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: [80, 200],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Eagle',
            start: 2000,
            stop: 2000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        }


    ];

    director.populateStage(stageView, actorDescriptions, actionDescriptions);

    mainContext.add(stageView);
});
