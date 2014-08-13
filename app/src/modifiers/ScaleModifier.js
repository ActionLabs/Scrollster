define(function(require, exports, module) {
    'use strict'
    var Modifier       = require('famous/core/Modifier');
    var Transform      = require('famous/core/Transform');

    function ScaleModifier(scrollStart, scrollStop, changeRatioX, changeRatioY) {
        this.scrollStart = scrollStart;
        this.scrollStop = scrollStop;
        this.scrollRange = scrollStop - scrollStart;
        this.changeRatioX = changeRatioX;
        this.changeRatioY = changeRatioY;
        _makeModifier.call(this);
        Modifier.call(this, this.modifier);
    }

    ScaleModifier.prototype = Object.create(Modifier.prototype);
    ScaleModifier.prototype.constructor = ScaleModifier;

    ScaleModifier.prototype.checkAndUpdate = function(scrollPosition, delta) {
        var progress = (scrollPosition - this.scrollStart) / this.scrollRange;

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
            transform:  function () {
                return Transform.scale(this.scaleX, this.scaleY, 1); 
            }.bind(this)
        };
    }

    module.exports = ScaleModifier;
});
