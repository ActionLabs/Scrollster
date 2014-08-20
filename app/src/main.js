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
            content: 'content/images/cropped-ground.jpg',
            zIndex: 3,
            properties: {
            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Sky1: {
            type: 'image',
            content: 'content/images/cropped-sky1.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Sky2: {
            type: 'image',
            content: 'content/images/cropped-sky2.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Earth: {
            type: 'image',
            content: 'content/images/cropped-earth.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth, window.innerHeight],
            position: [0, 0]
        },
        Space: {
            type: 'image',
            content: 'content/images/cropped-space.jpg',
            zIndex: 3,
            properties: {

            },
            size: [window.innerWidth * 2, window.innerHeight],
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
                backgroundColor: '#FFFF00',
            },
            size: [20, 2],
            position: ['50%', 29]
        },

    // EXPERIMENTAL

        'Spaceship': {
            type: 'image',
            content: 'content/images/spaceship.png',
            zIndex: 13,
            properties: {
                fontSize: '2em',
                padding: '.5em',
            },
            size: [112, 78.5],
            position: [-150, 100]
        },
        'Laser1': {
            type: 'html',
            zIndex: 14,
            properties: {
                backgroundColor: '#FFFF00',
                borderRadius: '50%'
            },
            size: [10, 2.5],
            position: [50, 115]
        },
        'Laser2': {
            type: 'html',
            zIndex: 14,
            properties: {
                backgroundColor: '#FFFF00',
                borderRadius: '50%'
            },
            size: [10, 2.5],
            position: [100, 250]
        },
        'Alien1': {
            type: 'image',
            zIndex: 10,
            content: 'content/images/alien.png',
            properties: {

            },
            size: [50, 36.25],
            position: [window.innerWidth + 150, -250]
        },
        'Alien2': {
            type: 'image',
            zIndex: 12,
            content: 'content/images/alien.png',
            properties: {

            },
            size: [50, 36.25],
            position: [window.innerWidth + 150, -250]
        },
        'Explosion1': {
            type: 'image',
            zIndex: 11,
            content: 'content/images/explosion.png',
            properties: {

            },
            size: [103, 103],
            position: [400, 115]
        },
        'Explosion2': {
            type: 'image',
            zIndex: 11,
            content: 'content/images/explosion.png',
            properties: {

            },
            size: [103, 103],
            position: [400, 250]
        },
        'Scrollster': {
            type: 'html',
            content: '<h1>Scrollster</h1>',
            zIndex: 15,
            properties: {
                color: '#FFF',
                fontFamily: 'monospace',
            },
            size: [50, 25],
            position: [-250, -250]
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
                location: ['120%', '50%']
            }
        },
        {
            actor: 'UFO',
            start: 6000,
            stop: 6000,
            type: 'opacity',
            properties: {
                fadeOut: true
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


    // EXPERIMENTAL

        {
            actor: 'Spaceship',
            start: 6000,
            stop: 6100,
            type: 'moveTo',
            properties: {
                location: [50, 150],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 6100,
            stop: 6400,
            type: 'moveTo',
            properties: {
                location: [50, 108],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 6600,
            stop: 7100,
            type: 'moveTo',
            properties: {
                location: [50, 150],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 7100,
            stop: 7600,
            type: 'moveTo',
            properties: {
                location: [100, 244],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 7600,
            stop: 7900,
            type: 'moveTo',
            properties: {
                location: [100, 200],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 7900,
            stop: 8600,
            type: 'moveTo',
            properties: {
                location: [100, 150],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 8600,
            stop: 8900,
            type: 'moveTo',
            properties: {
                location: [1500, 50],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Laser1',
            start: 6655,
            stop: 6665,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Laser1',
            start: 6600,
            stop: 7100,
            type: 'moveTo',
            properties: {
                location: [250, 115]
            }
        },
        {
            actor: 'Laser1',
            start: 7100,
            stop: 7100,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Laser2',
            start: 7659,
            stop: 7669,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Laser2',
            start: 7600,
            stop: 8100,
            type: 'moveTo',
            properties: {
                location: [250, 250]
            }
        },
        {
            actor: 'Laser2',
            start: 8100,
            stop: 8100,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Alien1',
            start: 5600,
            stop: 7100,
            type: 'moveTo',
            properties: {
                location: [250, 115],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Alien1',
            start: 7100,
            stop: 7100,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Alien2',
            start: 5600,
            stop: 8100,
            type: 'moveTo',
            properties: {
                location: [250, 250],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Alien2',
            start: 8100,
            stop: 8100,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Explosion1',
            start: 7100,
            stop: 9600,
            type: 'scale',
            properties: {
                changeRatioX: 2,
                changeRatioY: 2,
                curve: 'easeOut'
            }
        },
        {
            actor: 'Explosion1',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: [250, 115]
            }
        },
        {
            actor: 'Explosion1',
            start: 7100,
            stop: 7100,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Explosion2',
            start: 8100,
            stop: 9600,
            type: 'scale',
            properties: {
                changeRatioX: 2,
                changeRatioY: 2,
                curve: 'easeOut'
            }
        },
        {
            actor: 'Explosion2',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: [250, 250]
            }
        },
        {
            actor: 'Explosion2',
            start: 8100,
            stop: 8100,
            type: 'opacity',
            properties: {}
        },
        // {
        //     actor: 'Scrollster',
        //     start: 9000,
        //     stop: 9500,
        //     type: 'scale',
        //     properties: {
        //         changeRatioX: 1.2,
        //         changeRatioY: 1.2,
        //         curve: 'easeOut'
        //     }
        // },
        {
            actor: 'Scrollster',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: ['11%', '35%']
            }
        },
        {
            actor: 'Scrollster',
            start: 8600,
            stop: 9100,
            type: 'opacity',
            properties: {}
        },
        // {
        //     actor: 'Scrollster',
        //     start: 9000,
        //     stop: 10000,
        //     type: 'rotateTo',
        //     properties: {
        //         axis: 'x',
        //         angleInDegrees: 720,
        //         curve: 'easeOut'
        //     }
        // },

    ];

    director.populateStage(stageView, actorDescriptions, actionDescriptions);

    mainContext.add(stageView);
});
