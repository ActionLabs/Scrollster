define(function(require, exports, module) {
    'use strict';
    var UnitConverter  = require('tools/UnitConverter');
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier       = require('famous/core/Modifier');  // Parent class

    function MoveToModifier(options) {
        this.options = Object.create(MoveToModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.actor = this.options.actor;
        this.scrollStart  = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;
        this.pixelsStopX = this.options.pixelsStopX;
        this.pixelsStopY = this.options.pixelsStopY;
        this.scrollState = 'inactive';

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    MoveToModifier.DEFAULT_OPTIONS = {
        actor: undefined,
        scrollStart: 0,
        scrollStop: 0,
        curveFn: function(t) {
            return t;
        },
        pixelsStopX: 0,
        pixelsStopY: 0
    };

    MoveToModifier.prototype = Object.create(Modifier.prototype);
    MoveToModifier.prototype.constructor = MoveToModifier;

    MoveToModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    MoveToModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if ((this.scrollStart === undefined ||
            scrollPosition >= this.scrollStart) &&
            (this.scrollStop === undefined ||
            scrollPosition <= this.scrollStop)) {
            // Inside scroll range
            this.scrollState = 'active';

            var currPixelX = UnitConverter.ratioXtoPixels(this.actor.xPosition);
            var currPixelY = UnitConverter.ratioYtoPixels(this.actor.yPosition);

            if (!this.startX) this.startX = currPixelX;
            if (!this.startY) this.startY = currPixelY;

            var newPixelX = (this.pixelsStopX - this.startX) * this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);
            var newPixelY = (this.pixelsStopY - this.startY) * this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);

            this.actor.setPositionPixels(this.startX + newPixelX, this.startY + newPixelY);

        } else if (((scrollPosition - delta) <= this.scrollStop) &&
                   (scrollPosition > this.scrollStop)) {
            // Passing out of scroll range.
            this.scrollState = 'upper';
            this.actor.setPositionPixels(this.pixelsStopX, this.pixelsStopY);
        } else if (((scrollPosition - delta) >= this.scrollStart) &&
                   (scrollPosition < this.scrollStart)) {
            // Passing out of scroll range.
            this.scrollState = 'lower';
            if (this.startX !== undefined && this.startY !== undefined){
                this.actor.setPositionPixels(this.startX, this.startY);
            }
        } else {
            // out of range
            this.scrollState = 'inactive';
        }
    };

    function _makeModifier() {
        this.modifier = {
            origin: [0.5, 0.5],
            align: function() {
                // if (this.scrollState === 'active') {
                //     return [this.actor.xPosition, this.actor.yPosition];
                // } else {
                //     return undefined;
                // }
                return [this.actor.xPosition, this.actor.yPosition];
            }.bind(this)
        };
    }

    module.exports = MoveToModifier;
});
