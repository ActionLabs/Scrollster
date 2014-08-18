define(function(require, exports, module) {
    'use strict';
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier       = require('famous/core/Modifier');
    var Transform      = require('famous/core/Transform');

    function SkewModifier(options) {
        this.options = Object.create(SkewModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.scrollStart = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;
        this.phi = this.options.phi;
        this.theta = this.options.theta;
        this.psi = this.options.psi;

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    SkewModifier.DEFAULT_OPTIONS = {
        scrollStart: 0,
        scrollStop: 0,
        curveFn: function(t) {
            return t;
        },
        phi: 0,
        theta: 0,
        psi: 0
    };

    SkewModifier.prototype = Object.create(Modifier.prototype);
    SkewModifier.prototype.constructor = SkewModifier;

    SkewModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    SkewModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        var progress = this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);

        if (scrollPosition > this.scrollStart &&
            scrollPosition < this.scrollStop) {
            this.skewX = progress * this.phi;
            this.skewY = progress * this.theta;
            this.skewZ = progress * this.psi;
        } else if (scrollPosition <= this.scrollStart) {
            this.skewX = 0;
            this.skewY = 0;
            this.skewZ = 0;
        } else if (scrollPosition >= this.scrollStop) {
            this.skewX = this.phi;
            this.skewY = this.theta;
            this.skewZ = this.psi;
        }
    };

    function _makeModifier() {
        this.modifier = {
            transform: function() {
                return Transform.skew(this.skewX, this.skewY, this.skewZ);
            }.bind(this)
        };
    }

    module.exports = SkewModifier;
});
