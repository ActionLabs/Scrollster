define(function(require, exports, module) {
    'use strict';
    var UnitConverter = require('tools/UnitConverter');
    var Modifier      = require('famous/core/Modifier');  // Parent class

    function PositionModifier(actor, scaleX, scaleY, scrollStart, scrollStop) {
        this.actor = actor;
        this.scrollStart  = scrollStart;
        this.scrollStop = scrollStop;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scrollState = 'inactive';

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    PositionModifier.prototype = Object.create(Modifier.prototype);
    PositionModifier.prototype.constructor = PositionModifier;

    PositionModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if ((!this.scrollStart ||
            scrollPosition >= this.scrollStart) && 
            (!this.scollStop || 
            scrollPosition <= this.scrollStop)) {
            // Inside scroll range
            this.scrollState = 'active';
            _incrementPosition.call(this, delta);
        } else if (((scrollPosition - delta) <= this.scrollStop) &&
                   (scrollPosition > this.scrollStop)) {
            // Passing out of scroll range.
            this.scrollState = 'upper';
            var newDelta = this.scrollStop - (scrollPosition - delta);
            _incrementPosition.call(this, newDelta);
        } else if (((scrollPosition - delta) >= this.scrollStart) &&
                   (scrollPosition < this.scrollStart)) {
            // Passing out of scroll range.
            this.scrollState = 'lower';
            var newDelta = this.scrollStart - (scrollPosition - delta);
            _incrementPosition.call(this, newDelta);
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
        this.actor.incrementPosition(-UnitConverter.pixelsToRatioX(pixelDelta) * this.scaleX, -UnitConverter.pixelsToRatioY(pixelDelta) * this.scaleY);
    } 

    module.exports = PositionModifier;
});