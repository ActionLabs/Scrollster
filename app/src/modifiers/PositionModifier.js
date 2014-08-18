define(function(require, exports, module) {
    'use strict';
    var UnitConverter = require('tools/UnitConverter');
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier      = require('famous/core/Modifier');  // Parent class

    function PositionModifier(options) {
        this.options = Object.create(PositionModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.actor = this.options.actor;
        this.scrollStart  = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.scaleX = this.options.scaleX;
        this.scaleY = -this.options.scaleY; //Have to invert so that positive values respond as expected.
        this.scrollState = 'inactive';

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    PositionModifier.DEFAULT_OPTIONS = {
        actor: undefined,
        scaleX: 1,
        scaleY: 1,
        scrollStart: 0,
        scrollStop: 0
    };

    PositionModifier.prototype = Object.create(Modifier.prototype);
    PositionModifier.prototype.constructor = PositionModifier;

    PositionModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    PositionModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
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
            _incrementPosition.call(this, delta);
        } else if (((scrollPosition - delta) <= this.scrollStop) &&
                   (scrollPosition > this.scrollStop)) {
            // Passing out of scroll range.
            this.scrollState = 'upper';
            if (this.startX !== undefined && this.startY !== undefined){
                var endX = this.startX + ((this.scrollRange) * this.scaleX);
                var endY = this.startY + ((this.scrollRange) * this.scaleY);
                this.actor.setPositionPixels(endX, endY);
            }
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

    function _incrementPosition(pixelDelta) {
        this.actor.incrementPosition(UnitConverter.pixelsToRatioX(pixelDelta) * this.scaleX, UnitConverter.pixelsToRatioY(pixelDelta) * this.scaleY);
    }

    module.exports = PositionModifier;
});
