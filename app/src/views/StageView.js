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
        _setupScrollInfoSurface.call(this);
        _handleScroll.call(this);
        _setupArrowKeyBreakpoints.call(this, [300, 500, 700, 900, 1000], 4, 10);
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

    function _setupScrollInfoSurface() {
        this.scrollInfo = new Surface({
            size: [200, 200],
            content: 'Scroll Value: ',
            properties: {
                backgroundColor: 'white',
                zIndex: '0'
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
            // If movement is already in progress, cancel interval
            if (this._arrowData.interval) {
                Timer.clear(this._arrowData.interval);
                delete this._arrowData.interval;
            }
            // Up arrow key
            if (e.keyCode === 38) {
                // Decrement index if not at top of page
                if (this._arrowData.index > 0) this._arrowData.index--;

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue <= this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue > this._arrowData.breakpoints[this._arrowData.index]) {
                            this.worldScrollValue -= step;
                            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
                            this._eventOutput.emit('ScrollUpdated', {delta: -step});
                        } else {
                            Timer.clear(this._arrowData.interval);
                            delete this._arrowData.interval;
                        }
                    }
                }.bind(this), this._arrowData.speed);

            // Down arrow key
            } else if (e.keyCode === 40) {
                // Increment index if not at last breakpoint
                if (this._arrowData.index < this._arrowData.breakpoints.length - 1) this._arrowData.index++;

                this._arrowData.interval = Timer.setInterval(function() {
                    if (this.worldScrollValue >= this._arrowData.breakpoints[this._arrowData.index]) {
                        Timer.clear(this._arrowData.interval);
                        delete this._arrowData.interval;
                    } else {
                        if (this.worldScrollValue < this._arrowData.breakpoints[this._arrowData.index]) {
                            this.worldScrollValue += step;
                            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
                            this._eventOutput.emit('ScrollUpdated', {delta: step});
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
