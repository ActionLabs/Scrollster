define(function(require, exports, module) {
    'use strict';
    var Modifier       = require('famous/core/Modifier');
    var Transform      = require('famous/core/Transform');

    function SkewModifier(scrollStart, scrollStop, curveFn, phi, theta, psi) {
        this.scrollStart = scrollStart;
        this.scrollStop = scrollStop;
        this.scrollRange = scrollStop - scrollStart;
        this.curveFn = curveFn;
        this.phi = phi || 0;
        this.theta = theta || 0;
        this.psi = psi || 0;
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    SkewModifier.prototype = Object.create(Modifier.prototype);
    SkewModifier.prototype.constructor = SkewModifier;

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
