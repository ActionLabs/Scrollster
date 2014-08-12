define(function(require, exports, module) {
    'use strict'
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');

    function OpacityModifier(scrollStart, scrollStop) {
        this.scrollStart = scrollStart;
        this.scrollStop = scrollStop;
        this.range = scrollStop - scrollStart;
        this.transitionable = new Transitionable(0);
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    OpacityModifier.prototype = Object.create(Modifier.prototype);
    OpacityModifier.prototype.constructor = OpacityModifier;

    OpacityModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        if ((this.scrollStart === undefined ||
            scrollPosition >= this.scrollStart) &&
            (this.scrollStop === undefined ||
            scrollPosition <= this.scrollStop)) {

                this.transitionable.set(this.transitionable.get() + delta / this.range);
        }
    };

    function _makeModifier() {
        this.modifier = {
            opacity:  function () {
                console.log(this.transitionable.get());
                return this.transitionable.get()
            }.bind(this)
        };
    }

    module.exports = OpacityModifier;
});
