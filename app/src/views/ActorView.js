define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var ModifierChain = require('famous/modifiers/ModifierChain');
    var UnitConverter = require('tools/UnitConverter');

    function ActorView() {
        View.apply(this, arguments);
        this.modifiers = [];
        this.modifierChain = new ModifierChain();
        this.scrollProgress = 0;
        this.xPosition = this.options.xPosition;
        this.yPosition = this.options.yPosition;
        this.zPosition = this.options.zPosition;
        this.scaleX = this.options.scaleX;
        this.scaleY = this.options.scaleY;
        this.opacity = this.options.opacity;
        this.destination = this.options.destination;
        this.name = this.options.name;

        _listenToScroll.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {
        name: undefined,
        xPosition: 0.5,
        yPosition: 0.5,
        zPosition: 0,
        opacity: 1,
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

        _createBaseModifier.call(this); // Ensures actor always has a position modifier
        this.add(this.modifierChain).add(this.mainSurface);
    };

    function _listenToScroll() {
        this._eventInput.on('ScrollUpdated', _updateScrollValue.bind(this));
    }

    function _createBaseModifier() {
        var baseModifier = new Modifier({
            origin: [0.5, 0.5],
            align: function() {
                return [this.xPosition, this.yPosition];
            }.bind(this),
            transform: Transform.translate(0, 0, this.zPosition)
        });

        this.modifierChain.addModifier(baseModifier);
    }

    function _updateScrollValue(data) {
        this.scrollProgress += data.delta;
        _updateModifiers.call(this, data.delta);
    }

    function _updateModifiers(delta) {
        // Tell all the modifiers to update based on the current state of the world
        for (var i = 0; i < this.modifiers.length; i++) {
            var currentModifier = this.modifiers[i];
            currentModifier.checkAndUpdate(this.scrollProgress, delta);
        }
    }

    module.exports = ActorView;
});
