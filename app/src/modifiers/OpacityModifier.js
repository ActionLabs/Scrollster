define(function(require, exports, module) {
    'use strict';
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier       = require('famous/core/Modifier');

    function OpacityModifier(options) {
        this.options = Object.create(OpacityModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.fadeOut = this.options.fadeOut;
        this.initialOpacity = this.options.fadeOut === true ? 1 : 0;
        this.finalOpacity = this.options.fadeOut === true ? 0 : 1;
        this.scrollStart = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;
        this.opacity = this.initialOpacity;

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    OpacityModifier.DEFAULT_OPTIONS = {
        scrollStart: 0,
        scrollStop: 0,
        curveFn: function(t) {
            return t;
        },
        fadeOut: false
    };

    OpacityModifier.prototype = Object.create(Modifier.prototype);
    OpacityModifier.prototype.constructor = OpacityModifier;

    OpacityModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    OpacityModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if (scrollPosition > this.scrollStart &&
            scrollPosition < this.scrollStop) {

            if (this.fadeOut) {
                this.opacity = 1 - this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);
            } else {
                this.opacity = this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);
            }

        } else if (scrollPosition <= this.scrollStart) {
            this.opacity = this.initialOpacity;
        } else if (scrollPosition >= this.scrollStop) {
            this.opacity = this.finalOpacity;
        }
    };

    function _makeModifier() {
        this.modifier = {
            opacity: function() {
                return this.opacity;
            }.bind(this)
        };
    }

    module.exports = OpacityModifier;
});
