define(function(require, exports, module) {
    'use strict';
    var UnitConverter = require('tools/UnitConverter');
    var Transform     = require('famous/core/Transform');
    var Modifier      = require('famous/core/Modifier');  // Parent class

    function PositionModifier(actor, scrollStart, scrollStop, axis, angleInDegrees) {
        this.actor = actor;
        this.scrollStart  = scrollStart;
        this.scrollStop = scrollStop;
        this.theta = 0;
        this.startTheta = 0;
        this.stopTheta = UnitConverter.degreesToRadians(angleInDegrees);
        this.rotateState = 'inactive';

        _setupAxis.call(this, axis);
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    PositionModifier.prototype = Object.create(Modifier.prototype);
    PositionModifier.prototype.constructor = PositionModifier;

    PositionModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if ((this.scrollStart === undefined ||
            scrollPosition >= this.scrollStart) &&
            (this.scrollStop === undefined ||
            scrollPosition <= this.scrollStop)) {
            // Inside scroll range
            this.rotateState = 'active';
            var progress = (scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart);
            this.theta = this.stopTheta * progress;
        } else if (((scrollPosition - delta) <= this.scrollStop) &&
                   (scrollPosition > this.scrollStop)) {
            // Passing out of scroll range.
            this.rotateState = 'upper';
            this.theta = this.stopTheta;
        } else if (((scrollPosition - delta) >= this.scrollStart) &&
                   (scrollPosition < this.scrollStart)) {
            // Passing out of scroll range.
            this.rotateState = 'lower';
            this.theta = this.startTheta;
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
