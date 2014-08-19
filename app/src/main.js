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
        Earth: {
            type: 'image',
            content: 'content/images/earth.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Space: {
            type: 'image',
            content: 'content/images/space.jpg',
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
            position: ['50%', 400]
        },
        Eagle: {
            type: 'image',
            content: 'content/images/eagle.png',
            zIndex: 13,
            properties: {

            },
            size: [64, 44],
            position: [250, 300]
        },
        Shuttle: {
            type: 'image',
            content: 'content/images/shuttle.png',
            zIndex: 13,
            properties: {

            },
            size: [160, 80],
            position: ['80%', '80%']
        },
        Satellite: {
            type: 'image',
            content: 'content/images/satellite.png',
            zIndex: 13,
            properties: {

            },
            size: [97, 87],
            position: ['2%', '2%']
        },
        UFO: {
            type: 'image',
            content: 'content/images/ufo.png',
            zIndex: 15,
            properties: {

            },
            size: [114, 30],
            position: ['50%', 15]
        },
        Beam: {
            type: 'html',
            zIndex: 12,
            properties: {
                backgroundColor: '#FFFF00'
            },
            size: [20, 2],
            position: ['50%', 29]
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
                location: ['50%', 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 1000,
            stop: 1000,
            type: 'moveTo',
            properties: {
                location: ['50%', window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 1000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: ['50%', 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 2000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: ['50%', window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 2000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: ['50%', 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 3000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: ['50%', window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 3000,
            stop: 4000,
            type: 'moveTo',
            properties: {
                location: ['50%', 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 4000,
            stop: 4000,
            type: 'moveTo',
            properties: {
                location: ['50%', window.innerHeight],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 4000,
            stop: 5000,
            type: 'moveTo',
            properties: {
                location: ['50%', 0],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Balloon',
            start: 5000,
            stop: 5000,
            type: 'opacity',
            properties: {
                fadeOut: true
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
        {
            actor: 'Earth',
            start: 3000,
            stop: 3000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'Earth',
            start: 4000,
            stop: 4000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Space',
            start: 4000,
            stop: 4000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'Space',
            start: 6000,
            stop: 6000,
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
        },

        // Shuttle

        {
            actor: 'Shuttle',
            start: 2000,
            stop: 2000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'Shuttle',
            start: 2000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: ['17%', '80%'],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Shuttle',
            start: 3000,
            stop: 3000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },

        // Satellite
        {
            actor: 'Satellite',
            start: 3000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: ['20%', '20%'],
            }
        },
        {
            actor: 'Satellite',
            start: 3000,
            stop: 3000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'Satellite',
            start: 3000,
            stop: 4000,
            type: 'rotateTo',
            properties: {
                axis: 'z',
                angleInDegrees: 100
            }
        },
        {
            actor: 'Satellite',
            start: 4000,
            stop: 4000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },

        // UFO
        {
            actor: 'UFO',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: ['50%', 7],
            }
        },
        {
            actor: 'UFO',
            start: 4000,
            stop: 4000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'UFO',
            start: 5300,
            stop: 5500,
            type: 'moveTo',
            properties: {
                location: ['50%', '50%']
            }
        },
        {
            actor: 'UFO',
            start: 5500,
            stop: 6000,
            type: 'moveTo',
            properties: {
                location: ['100%', '50%']
            }
        },


        //Beam
        {
            actor: 'Beam',
            start: 4000,
            stop: 4300,
            type: 'scale',
            properties: {
                changeRatioX: 1,
                changeRatioY: 500
            }
        },
        {
            actor: 'Beam',
            start: 4000,
            stop: 4000,
            type: 'opacity',
            properties: {

            }
        },
        {
            actor: 'Beam',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: ['50%', 21],
            }
        },
        {
            actor: 'Beam',
            start: 5000,
            stop: 5300,
            type: 'scale',
            properties: {
                changeRatioX: 1,
                changeRatioY: 0.002
            }
        },
        {
            actor: 'Beam',
            start: 5300,
            stop: 5300,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },


 



    ];

    director.populateStage(stageView, actorDescriptions, actionDescriptions);

    mainContext.add(stageView);
});
