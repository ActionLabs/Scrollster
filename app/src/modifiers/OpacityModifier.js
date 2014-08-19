define(function(require, exports, module) {
    'use strict';
    var OptionsManager = require('famous/core/OptionsManager');
    var Modifier       = require('famous/core/Modifier');

    function OpacityModifier(options) {
        this.options = Object.create(OpacityModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.actor = this.options.actor;
        this.initialOpacity = undefined;
        this.finalOpacity = this.options.finalOpacity;
        this.scrollStart = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;

        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    OpacityModifier.DEFAULT_OPTIONS = {
        actor: undefined,
        scrollStart: 0,
        scrollStop: 0,
        finalOpacity: 1,
        curveFn: function(t) {
            return t;
        }
    };

    OpacityModifier.prototype = Object.create(Modifier.prototype);
    OpacityModifier.prototype.constructor = OpacityModifier;

    OpacityModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    OpacityModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if (scrollPosition > this.scrollStart &&
            scrollPosition < this.scrollStop) {

            if (this.initialOpacity === undefined) this.initialOpacity = this.actor.opacity;

            var range = this.finalOpacity - this.initialOpacity;

            this.actor.opacity = this.initialOpacity + (range * this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange));
        } else if (scrollPosition <= this.scrollStart) {
            if (this.initialOpacity !== undefined) {
                this.actor.opacity = this.initialOpacity;
            }
        } else if (scrollPosition >= this.scrollStop) {
            this.actor.opacity = this.finalOpacity;
        }
    };

    function _makeModifier() {
        this.modifier = {
            opacity: function() {
                return this.actor.opacity;
            }.bind(this)
        };
    }

    module.exports = OpacityModifier;
});
