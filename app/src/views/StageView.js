define(function(require, exports, module) {
    'use strict';
    var Engine        = require('famous/core/Engine');
    var Timer         = require('famous/utilities/Timer');

    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');

    var GenericSync   = require('famous/inputs/GenericSync');
    var MouseSync     = require('famous/inputs/MouseSync');
    var TouchSync     = require('famous/inputs/TouchSync');
    var ScrollSync    = require('famous/inputs/ScrollSync');

    GenericSync.register({
        'mouse': MouseSync,
        'touch': TouchSync,
        'scroll': ScrollSync
    });

    function StageView() {
        View.apply(this, arguments);
        this.worldScrollValue = 0;

        _setupScrollRecieverSurface.call(this);
        _handleScroll.call(this);
        _setupArrowKeyBreakpoints.call(this, [1000, 2000, 3000, 4000, 5000, 7000, 8000, 9000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000], 16, 60);
    }

    StageView.DEFAULT_OPTIONS = {

    };

    StageView.prototype = Object.create(View.prototype);
    StageView.prototype.constructor = StageView;

    StageView.prototype.addActor = function(newActor) {
        newActor.activate(this.sync);
        newActor.subscribe(this._eventOutput);
        this.add(newActor);
    };

    function _setupScrollRecieverSurface() {
        this.scrollRecieverSurface = new Surface({
            size: [undefined, undefined] // Take up the entire view
        });

        this.add(this.scrollRecieverSurface);
    }

    function _handleScroll() {
        this.sync = new GenericSync(
            ['touch', 'scroll'],
            {direction: GenericSync.DIRECTION_Y}
        );

        this.scrollRecieverSurface.pipe(this.sync);

        this.sync.on('update', function(data) {
            // Invert delta so scrolling up is positive.
            this.worldScrollValue -= data.delta;
            _emitScrollUpdate.call(this, data.delta);
        }.bind(this));

        this.sync.on('end', function(data) {
        }.bind(this));
    }

    function _emitScrollUpdate(delta) {
        this._eventOutput.emit('ScrollUpdated', {delta: -delta});
    }

    function _setupArrowKeyBreakpoints(breakpoints, speed, step) {
        this._arrowData = {};
        this._arrowData.breakpoints = [0].concat(breakpoints);
        this._arrowData.index = 0;
        this._arrowData.speed = speed || 4;
        this._arrowData.step = step || 10;

        Engine.on('keydown', function(e) {
            var i; // Iterator
            // If movement is already in progress, cancel interval
            if (this._arrowData.interval) {
                Timer.clear(this._arrowData.interval);
                delete this._arrowData.interval;
            }
            // Up arrow key
            if (e.keyCode === 38) {
                // Set index based on next lowest breakpoint
                for (i = this._arrowData.breakpoints.length - 1; i >= 0; i--) {
                    if (this.worldScrollValue > this._arrowData.breakpoints[i]) {
                        this._arrowData.index = i;
                        break;
                    }
                }

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue <= this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue > this._arrowData.breakpoints[this._arrowData.index]) {
                            var currentStep = Math.min(this._arrowData.step, this.worldScrollValue - this._arrowData.breakpoints[this._arrowData.index]);
                            this.worldScrollValue -= currentStep;
                            _emitScrollUpdate.call(this, currentStep);
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);

            // Down arrow key
            } else if (e.keyCode === 40) {
                // Set index based on next highest breakpoint
                for (i = 0; i < this._arrowData.breakpoints.length; i++) {
                    if (this.worldScrollValue < this._arrowData.breakpoints[i]) {
                        this._arrowData.index = i;
                        break;
                    }
                }

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue >= this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue < this._arrowData.breakpoints[this._arrowData.index]) {
                            var currentStep = Math.min(this._arrowData.step, this._arrowData.breakpoints[this._arrowData.index] - this.worldScrollValue);
                            this.worldScrollValue += currentStep;
                            _emitScrollUpdate.call(this, -currentStep);
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);
            }
        }.bind(this));
    }

    module.exports = StageView;
});
