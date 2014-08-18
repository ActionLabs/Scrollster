define(function(require, exports, module) {
    'use strict';
    var UnitConverter  = require('tools/UnitConverter');
    var Transform      = require('famous/core/Transform');
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier       = require('famous/core/Modifier');  // Parent class

    function RotateToModifier(options) {
        this.options = Object.create(RotateToModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.actor = this.options.actor;
        this.scrollStart  = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;
        this.theta = 0;
        this.startTheta = 0;
        this.stopTheta = UnitConverter.degreesToRadians(this.options.angleInDegrees);
        this.rotateState = 'inactive';

        _setupAxis.call(this, this.options.axis);
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    RotateToModifier.DEFAULT_OPTIONS = {
        actor: undefined,
        scrollStart: 0,
        scrollStop: 0,
        curveFn: function(t) {
            return t;
        },
        axis: 'z',
        angleInDegrees: 360
    };

    RotateToModifier.prototype = Object.create(Modifier.prototype);
    RotateToModifier.prototype.constructor = RotateToModifier;

    RotateToModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    RotateToModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if ((this.scrollStart === undefined ||
            scrollPosition >= this.scrollStart) &&
            (this.scrollStop === undefined ||
            scrollPosition <= this.scrollStop)) {
            // Inside scroll range
            this.rotateState = 'active';
            var progress = (scrollPosition - this.scrollStart) / (this.scrollRange);
            this.theta = this.stopTheta * this.curveFn(progress);
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

    module.exports = RotateToModifier;
});
