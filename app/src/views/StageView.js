define(function(require, exports, module) {
    'use strict';
    var Engine        = require('famous/core/Engine');
    var Timer         = require('famous/utilities/Timer');

    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');

    var GenericSync   = require('famous/inputs/GenericSync');
    var MouseSync     = require('famous/inputs/MouseSync');
    var TouchSync     = require('famous/inputs/TouchSync');
    var ScrollSync    = require('famous/inputs/ScrollSync');

    var ActorView     = require('views/ActorView');
    var UnitConverter = require('tools/UnitConverter');
    var PositionModifier = require('modifiers/PositionModifier');
    var MoveToModifier   = require('modifiers/MoveToModifier');
    var RotateToModifier   = require('modifiers/RotateToModifier');

    GenericSync.register({
        'mouse': MouseSync,
        'touch': TouchSync,
        'scroll': ScrollSync
    });

    function StageView() {
        View.apply(this, arguments);
        this.worldScrollValue = 0;

        _setupScrollRecieverSurface.call(this);
        _setupScrollInfoSurface.call(this);
        _handleScroll.call(this);
        _createDemoActor.call(this);
        _setupArrowKeyBreakpoints.call(this, [500, 1000, 1500], 4, 5);
    }

    StageView.DEFAULT_OPTIONS = {

    };

    StageView.prototype = Object.create(View.prototype);
    StageView.prototype.constructor = StageView;

    function _setupScrollRecieverSurface() {
        this.scrollRecieverSurface = new Surface({
            size: [undefined, undefined] // Take up the entire view
        });

        this.add(this.scrollRecieverSurface);
    }

    function _setupScrollInfoSurface() {
        this.scrollInfo = new Surface({
            size: [200, 200],
            content: 'Scroll Value: ',
            properties: {
                backgroundColor: 'white'
            }
        });

        this.add(this.scrollInfo);
    }

    function _handleScroll() {
        this.sync = new GenericSync(
            ['touch', 'scroll'],
            {direction: GenericSync.DIRECTION_Y}
        );

        this.scrollRecieverSurface.pipe(this.sync);
        this.scrollInfo.pipe(this.sync);

        this.sync.on('update', function(data) {
            // Invert delta so scrolling up is positive.
            this.worldScrollValue -= data.delta;
            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
            this._eventOutput.emit('ScrollUpdated', {delta: -data.delta});
        }.bind(this));

        this.sync.on('end', function(data) {
        }.bind(this));
    }

    function _setupArrowKeyBreakpoints(breakpoints, speed, step) {
        this._arrowData = {};
        this._arrowData.breakpoints = [0].concat(breakpoints);
        this._arrowData.index = 0;
        this._arrowData.speed = speed;

        Engine.on('keydown', function(e) {
            // If movement is already in progress, do nothing. TODO: enable cancelling movement
            if (this._arrowData.interval) return;
            // Up arrow key 
            if (e.keyCode === 38) {
                // Decrement index if not at top of page
                if (this._arrowData.index > 0) this._arrowData.index--;
                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue === this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue > this._arrowData.breakpoints[this._arrowData.index]) {
                            this.worldScrollValue -= step;
                            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
                            this._eventOutput.emit('ScrollUpdated', {delta: step});
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);

            // Down arrow key
            } else if (e.keyCode === 40) {
                // Increment index if not at last breakpoint
                if (this._arrowData.index !== this._arrowData.breakpoints.length - 1) this._arrowData.index++;
                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue === this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue < this._arrowData.breakpoints[this._arrowData.index]) {
                            this.worldScrollValue += step;
                            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
                            this._eventOutput.emit('ScrollUpdated', {delta: -step});
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);
            }
        }.bind(this));
    }

    function _createDemoActor() {
        var demoActor = new ActorView();

        demoActor.setPositionPixels(150, 150);
        var positionModifier = new PositionModifier(demoActor, 0, -1, 0, 600);
        var moveToModifier = new MoveToModifier(demoActor, 600, 1000, 720, 450);
        var rotateToModifier = new RotateToModifier(demoActor, 0, 1000, 'y', 540);

        demoActor.addModifier(rotateToModifier);
        demoActor.addModifier(positionModifier);
        demoActor.addModifier(moveToModifier);
        // demoActor.setPositionPixels(900, 100);

        var opacityModifier = new Modifier({
            opacity: function() {
                return Math.max(0, -this.scrollProgress / 100);
            }.bind(demoActor)
        });

        // demoActor.addModifier(opacityModifier);

        // demoActor.destination = {
        //     x: 150,
        //     y: 150,
        //     stopScroll: -1500,
        //     startScroll: -100
        // };

        demoActor.activate(this.sync);
        demoActor.subscribe(this._eventOutput);

        this.add(demoActor);

        // **** second demonstraton actor

        // var demoActor2 = new ActorView();
        // window.demoActor2 = demoActor2;

        // var demoActor2Surface = new Surface({
        //     size: [200, 200],
        //     content: 'Actor Two',
        //     properties: {
        //         backgroundColor: 'red',
        //         fontSize: '4em',
        //         padding: '.5em',
        //         backfaceVisibility: 'visible'
        //     }
        // });

        // demoActor2.scaleX = -2;

        // demoActor2.addSurface(demoActor2Surface);

        // demoActor2.setPositionPixels(100, 700);

        // var spinModifier2 = new Modifier({
        //     transform: function() {
        //         return Transform.rotateY((this.scrollProgress/150) * 3.1415962);
        //     }.bind(demoActor2)
        // });

        // demoActor2.addModifier(spinModifier2);

        // demoActor2.activate(this.sync);
        // demoActor2.subscribe(this._eventOutput);

        // this.add(demoActor2);
    }

    module.exports = StageView;
});
