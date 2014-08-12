define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var ModifierChain = require('famous/modifiers/ModifierChain');
    var UnitConverter = require('tools/UnitConverter');

    function ActorView() {
        View.apply(this, arguments);
        this.modifiers = [];
        this.modifierChain = new ModifierChain();
        this.scrollProgress = 0;
        this.xPosition = this.options.xPosition;
        this.yPosition = this.options.yPosition;
        this.scaleX = this.options.scaleX;
        this.scaleY = this.options.scaleY;
        this.destination = this.options.destination;

        _listenToScroll.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {
        xPosition: 0.5,
        yPosition: 0.5,
        destination: undefined,
        surfaceOptions: {
            size: [300, 300],
            content: 'This is a demo',
            properties: {
                backgroundColor: 'blue',
                fontSize: '4em',
                padding: '.5em',
                backfaceVisibility: 'visible'
            }
        }
    };

    ActorView.prototype = Object.create(View.prototype);
    ActorView.prototype.constructor = ActorView;

    ActorView.prototype.addModifier = function(newModifier) {
        this.modifiers.push(newModifier);
        this.modifierChain.addModifier(newModifier);
    };

    ActorView.prototype.addSurface = function(newSurface) {
        this.mainSurface = newSurface;
    };

    ActorView.prototype.setPositionRatio = function(newX, newY) {
        this.xPosition = newX;
        this.yPosition = newY;
    };

    ActorView.prototype.setPositionPixels = function(newX, newY) {
        this.xPosition = UnitConverter.pixelsToRatioX(newX);
        this.yPosition = UnitConverter.pixelsToRatioY(newY);
    };

    ActorView.prototype.incrementPosition = function(incrX, incrY) {
        this.xPosition += incrX;
        this.yPosition += incrY;
    };

    ActorView.prototype.activate = function(scrollSync) {
        if (!this.mainSurface) this.mainSurface = new Surface(this.options.surfaceOptions);

        this.mainSurface.pipe(scrollSync);

        this.add(this.modifierChain).add(this.mainSurface);
    };

    function _listenToScroll() {
        this._eventInput.on('ScrollUpdated', _updateScrollValue.bind(this));
    }

    function _updateScrollValue(data) {
        this.scrollProgress += data.delta;
        _updateModifiers.call(this, data.delta);
    }

    // function _scrollMove(delta) {
    //     // Apply the standard x and y movement
    //     this.incrementPosition(UnitConverter.pixelsToRatioX(delta) * this.scaleX, UnitConverter.pixelsToRatioY(delta) * this.scaleY);

    //     if (this.destination) {
    //         window.console.log('Scroll: ' + this.scrollProgress + ' before delta ' + (this.scrollProgress - delta));
    //         // passing top of the destination
    //         if (((this.scrollProgress - delta) >= this.destination.stopScroll) &&
    //             (this.scrollProgress < this.destination.stopScroll)) {
    //             this.setPositionPixels(this.destination.x, this.destination.y);
    //         }
    //         // passing bottom of the destination
    //         if (((this.scrollProgress - delta) <= this.destination.startScroll) &&
    //             (this.scrollProgress > this.destination.startScroll)) {
    //                 this.setPositionPixels(this.destination.startX, this.destination.startY);
    //         }
    //         // In the scroll range, position accordingly
    //         if (_inScrollRange.call(this, this.destination, this.scrollProgress)) {
    //                 var currPixelX = UnitConverter.ratioXtoPixels(this.xPosition);
    //                 var currPixelY = UnitConverter.ratioYtoPixels(this.yPosition);

    //                 if (!this.destination.startX) this.destination.startX = currPixelX;
    //                 if (!this.destination.startY) this.destination.startY = currPixelY;

    //                 var scrollRange = this.destination.startScroll - this.destination.stopScroll;

    //                 var newPixelX = ((this.destination.x - this.destination.startX) / scrollRange) * (this.destination.startScroll - this.scrollProgress);
    //                 var newPixelY = ((this.destination.y - this.destination.startY) / scrollRange) * (this.destination.startScroll - this.scrollProgress);

    //                 this.setPositionPixels(this.destination.startX + newPixelX, this.destination.startY + newPixelY);
    //         }
    //     }
    // }

    function _updateModifiers(delta) {
        // Tell all the modifiers to update based on the current state of the world
        for (var i = 0; i < this.modifiers.length; i++) {
            var currentModifier = this.modifiers[i];
            currentModifier.checkAndUpdate(this.scrollProgress, delta);
        }
    }

    module.exports = ActorView;
});
