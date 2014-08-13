define(function(require, exports, module) {
    'use strict'
    var Modifier       = require('famous/core/Modifier');

    function OpacityModifier(scrollStart, scrollStop) {
        this.scrollStart = scrollStart;
        this.scrollStop = scrollStop;
        this.range = scrollStop - scrollStart;
        this.opacity = 0;
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    OpacityModifier.prototype = Object.create(Modifier.prototype);
    OpacityModifier.prototype.constructor = OpacityModifier;

    OpacityModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if (scrollPosition > this.scrollStart &&
            scrollPosition < this.scrollStop) {

            this.opacity = (this.opacity + delta / this.range);
        } else if (scrollPosition <= this.scrollStart) {
            this.opacity = 0;
        } else if (scrollPosition >= this.scrollStop) {
            this.opacity = 1;
        }
    };

    function _makeModifier() {
        this.modifier = {
            opacity:  function () {
                return this.opacity;
            }.bind(this)
        };
    }

    module.exports = OpacityModifier;
});
