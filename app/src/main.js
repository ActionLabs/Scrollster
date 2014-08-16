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
        'Spaceship': {
            type: 'image',
            content: 'content/images/spaceship.png',
            zIndex: 13,
            properties: {
                fontSize: '2em',
                padding: '.5em',
            },
            size: [224, 157],
            position: [-300, 200]
        },
        'Laser1': {
            type: 'html',
            zIndex: 14,
            properties: {
                backgroundColor: '#FFFF00',
                borderRadius: '50%'
            },
            size: [20, 5],
            position: [200, 230]
        },
        'Laser2': {
            type: 'html',
            zIndex: 14,
            properties: {
                backgroundColor: '#FFFF00',
                borderRadius: '50%'
            },
            size: [20, 5],
            position: [200, 500]
        },
        'Alien1': {
            type: 'image',
            zIndex: 10,
            content: 'content/images/alien.png',
            properties: {

            },
            size: [200, 145],
            position: [window.innerWidth + 300, -500]
        },
        'Alien2': {
            type: 'image',
            zIndex: 12,
            content: 'content/images/alien.png',
            properties: {

            },
            size: [200, 145],
            position: [window.innerWidth + 300, -500]
        },
        'Explosion1': {
            type: 'image',
            zIndex: 11,
            content: 'content/images/explosion.png',
            properties: {

            },
            size: [206, 206],
            position: [800, 230]
        },
        'Explosion2': {
            type: 'image',
            zIndex: 11,
            content: 'content/images/explosion.png',
            properties: {

            },
            size: [206, 206],
            position: [800, 500]
        },
        'Scrollster': {
            type: 'html',
            content: '<h1>Scrollster</h1>',
            zIndex: 15,
            properties: {
                color: '#FFF',
                fontFamily: 'monospace',
            },
            size: [100, 50],
            position: [-500, -500]
        },
        'Trail': {
            type: 'image',
            zIndex: 12,
            content: 'content/images/trail.png',
            properties: {

            },
            size: [100, 34],
            position: [-300, 200]
        },
        'Trail2': {
            type: 'image',
            zIndex: 12,
            content: 'content/images/trail.png',
            properties: {

            },
            size: [100, 34],
            position: [-300, 200]
        }
    };

    var actionDescriptions = [
        {
            actor: 'Spaceship',
            start: 0,
            stop: 1000,
            type: 'moveTo',
            properties: {
                location: [200, 300],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 1000,
            stop: 2000,
            type: 'moveTo',
            properties: {
                location: [200, 212],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 2000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: [200, 300],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 3000,
            stop: 4000,
            type: 'moveTo',
            properties: {
                location: [200, 482],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 4000,
            stop: 5000,
            type: 'moveTo',
            properties: {
                location: [200, 400],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 5000,
            stop: 6000,
            type: 'moveTo',
            properties: {
                location: [200, 300],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Spaceship',
            start: 5000,
            stop: 7000,
            type: 'moveTo',
            properties: {
                location: [3000, 100],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Laser1',
            start: 2055,
            stop: 2065,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Laser1',
            start: 2000,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: [800, 230]
            }
        },
        {
            actor: 'Laser1',
            start: 2999,
            stop: 3000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Laser2',
            start: 4059,
            stop: 4069,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Laser2',
            start: 4000,
            stop: 5000,
            type: 'moveTo',
            properties: {
                location: [800, 500]
            }
        },
        {
            actor: 'Laser2',
            start: 5009,
            stop: 5010,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Alien1',
            start: 0,
            stop: 3000,
            type: 'moveTo',
            properties: {
                location: [800, 230],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Alien1',
            start: 3000,
            stop: 3001,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Alien2',
            start: 0,
            stop: 5000,
            type: 'moveTo',
            properties: {
                location: [800, 500],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Alien2',
            start: 5000,
            stop: 5001,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        },
        {
            actor: 'Explosion1',
            start: 3000,
            stop: 9000,
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
                location: [800, 230]
            }
        },
        {
            actor: 'Explosion1',
            start: 3000,
            stop: 3001,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Explosion2',
            start: 5000,
            stop: 11000,
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
                location: [800, 500]
            }
        },
        {
            actor: 'Explosion2',
            start: 5000,
            stop: 5001,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Scrollster',
            start: 5500,
            stop: 8000,
            type: 'scale',
            properties: {
                changeRatioX: 3,
                changeRatioY: 3,
                curve: 'easeOut'
            }
        },
        {
            actor: 'Scrollster',
            start: 0,
            stop: 0,
            type: 'moveTo',
            properties: {
                location: [250, 300]
            }
        },
        {
            actor: 'Scrollster',
            start: 5500,
            stop: 5501,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Scrollster',
            start: 5500,
            stop: 8000,
            type: 'rotateTo',
            properties: {
                axis: 'x',
                angleInDegrees: 720,
                curve: 'easeOut'
            }
        },
        {
            actor: 'Trail',
            start: 5000,
            stop: 6000,
            type: 'opacity',
            properties: {}
        },
        {
            actor: 'Trail',
            start: 5000,
            stop: 5000,
            type: 'moveTo',
            properties: {
                location: [90, 403],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Trail',
            start: 5000,
            stop: 7000,
            type: 'moveTo',
            properties: {
                location: [2850, 100],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Trail2',
            start: 0,
            stop: 990,
            type: 'moveTo',
            properties: {
                location: [80, 300],
                curve: 'easeIn'
            }
        },
        {
            actor: 'Trail2',
            start: 950,
            stop: 1000,
            type: 'opacity',
            properties: {
                fadeOut: true
            }
        }

    ];

    director.populateStage(stageView, actorDescriptions, actionDescriptions);

    mainContext.add(stageView);
});
