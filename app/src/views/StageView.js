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
        var leftArrowKeyCode = 37;
        var downArrowKeyCode = 38;
        var rightArrowKeyCode = 39;
        var upArrowKeyCode = 40;

        this._arrowData = {};
        this._arrowData.breakpoints = [0].concat(breakpoints);
        this._arrowData.index = 0;
        this._arrowData.speed = speed || 4;
        this._arrowData.step = step || 10;

        var nextBreakpoint; //init undefined

        Engine.on('keydown', function(e) {
            // If movement is already in progress, cancel interval
            if (this._arrowData.interval) {
                Timer.clear(this._arrowData.interval);
                delete this._arrowData.interval;
            }
            // Up arrow key
            if (e.keyCode === downArrowKeyCode || e.keyCode === leftArrowKeyCode) {
                // Set next lowest breakpoint
                nextBreakpoint = getNextScrollPoint.call(this, 'reversed');

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue <= nextBreakpoint) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue > nextBreakpoint) {
                            var currentStep = Math.min(this._arrowData.step, this.worldScrollValue - nextBreakpoint);
                            this.worldScrollValue -= currentStep;
                            _emitScrollUpdate.call(this, currentStep);
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);

            // Down arrow key
            } else if (e.keyCode === upArrowKeyCode || e.keyCode === rightArrowKeyCode) {
                // Set next highest breakpoint
                nextBreakpoint = getNextScrollPoint.call(this, 'forward');

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue >= nextBreakpoint) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue < nextBreakpoint) {
                            var currentStep = Math.min(this._arrowData.step, nextBreakpoint - this.worldScrollValue);
                            this.worldScrollValue += currentStep;
                            _emitScrollUpdate.call(this, -currentStep);
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);
            }

            // Function assumes that the breakboards are sorted lowest to highest.
            function getNextScrollPoint(searchDirection) {
                searchDirection = searchDirection ? searchDirection : 'forward';

                var searchBreakpoints = this._arrowData.breakpoints;
                var nextScrollPoint; //init undefined

                if (searchDirection !== 'forward') {
                    searchBreakpoints = searchBreakpoints.slice(0).reverse(); //copy array so we don't mutate the original with the reverse;
                }

                for (var i = 0; i < searchBreakpoints.length; i++) {
                    if ((searchDirection === 'forward' && this.worldScrollValue < searchBreakpoints[i]) ||
                        (searchDirection !== 'forward' && this.worldScrollValue > searchBreakpoints[i])) {
                        nextScrollPoint = searchBreakpoints[i];
                        break;
                    }
                }

                return nextScrollPoint;
            }
        }.bind(this));
    }

    module.exports = StageView;
});
