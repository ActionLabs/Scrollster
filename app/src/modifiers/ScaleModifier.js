define(function(require, exports, module) {
    'use strict';
    var Modifier       = require('famous/core/Modifier');
    var OptionsManager = require('famous/core/OptionsManager');
    var Transform      = require('famous/core/Transform');

    function ScaleModifier(options) {
        this.options = Object.create(ScaleModifier.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        if (options) this.setOptions(options);

        this.scrollStart = this.options.scrollStart;
        this.scrollStop = this.options.scrollStop;
        this.scrollRange = this.options.scrollStop - this.options.scrollStart;
        this.curveFn = this.options.curveFn;
        this.changeRatioX = this.options.changeRatioX;
        this.changeRatioY = this.options.changeRatioY;
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    ScaleModifier.DEFAULT_OPTIONS = {
        scrollStart: 0,
        scrollStop: 0,
        curveFn: function(t) {
            return t;
        },
        changeRatioX: 1,
        changeRatioY: 1
    };

    ScaleModifier.prototype = Object.create(Modifier.prototype);
    ScaleModifier.prototype.constructor = ScaleModifier;

    ScaleModifier.prototype.setOptions = function(options) {
        this._optionsManager.patch(options);
    };

    ScaleModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        var progress = this.curveFn((scrollPosition - this.scrollStart) / this.scrollRange);

        if (scrollPosition > this.scrollStart &&
            scrollPosition < this.scrollStop) {
            this.scaleX = 1 + progress * (this.changeRatioX - 1);
            this.scaleY = 1 + progress * (this.changeRatioY - 1);
        } else if (scrollPosition <= this.scrollStart) {
            this.scaleX = 1;
            this.scaleY = 1;
        } else if (scrollPosition >= this.scrollStop) {
            this.scaleX = this.changeRatioX;
            this.scaleY = this.changeRatioY;
        }
    };

    function _makeModifier() {
        this.modifier = {
            transform: function() {
                return Transform.scale(this.scaleX, this.scaleY, 1);
            }.bind(this)
        };
    }

    module.exports = ScaleModifier;
});
