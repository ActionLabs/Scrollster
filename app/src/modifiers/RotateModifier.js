define(function(require, exports, module) {
    'use strict';
    var Transform     = require('famous/core/Transform');
    var Modifier      = require('famous/core/Modifier');  // Parent class

    function PositionModifier(actor, scrollStart, scrollStop, axis, scale) {
        this.actor = actor;
        this.scrollStart  = scrollStart;
        this.scrollStop = scrollStop;
        this.scale = scale;
        this.theta = 0;
        this.rotateState = 'inactive';

        _setupAxis.call(this, axis);
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    PositionModifier.prototype = Object.create(Modifier.prototype);
    PositionModifier.prototype.constructor = PositionModifier;

    PositionModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        var newDelta = 0;
        if ((this.scrollStart === undefined ||
            scrollPosition >= this.scrollStart) &&
            (this.scrollStop === undefined ||
            scrollPosition <= this.scrollStop)) {
            // Inside scroll range
            this.rotateState = 'active';
            this.theta += delta * this.scale;
        } else if (((scrollPosition - delta) <= this.scrollStop) &&
                   (scrollPosition > this.scrollStop)) {
            // Passing out of scroll range.
            this.rotateState = 'upper';
            newDelta = this.scrollStop - (scrollPosition - delta);
            this.theta += newDelta * this.scale;
        } else if (((scrollPosition - delta) >= this.scrollStart) &&
                   (scrollPosition < this.scrollStart)) {
            // Passing out of scroll range.
            this.rotateState = 'lower';
            newDelta = this.scrollStart - (scrollPosition - delta);
            this.theta += newDelta * this.scale;
        } else {
            // out of range
            this.rotateState = 'inactive';
        }
        window.console.log(this.theta);
    };

    function _setupAxis(axis) {
        axis = axis.toLowerCase();
        if (axis === 'x') this.transform = Transform.rotateX;
        if (axis === 'y') this.transform = Transform.rotateY;
        if (axis === 'z') this.transform = Transform.rotateZ;
    }

    function _makeModifier() {
        this.modifier = {
            origin: [0.5, 0.5],
            transform: function() {
                // if (this.rotateState === 'active') {
                //     return [this.actor.xPosition, this.actor.yPosition];
                // } else {
                //     return undefined;
                // }
                return this.transform(this.theta);
            }.bind(this)
        };
    }

    module.exports = PositionModifier;
});
