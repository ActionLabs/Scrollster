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

        _addPositionModifier.call(this);
        _listenToScroll.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {
        xPosition: 0.5,
        yPosition: 0.5,
        surfaceOptions: {
            size: [300, 300],
            content: 'This is a demo',
            properties: {
                backgroundColor: 'blue',
                fontSize: '4em',
                padding: '.5em'
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

    function _addPositionModifier() {
        var positionModifier = new Modifier({
            align: function() {
                return [this.xPosition, this.yPosition];
            }.bind(this),
            origin: [0.5, 0.5]
        });

        this.addModifier(positionModifier);
    }

    function _listenToScroll() {
        this._eventInput.on('ScrollUpdated', _updateScrollValue.bind(this));
    }

    function _updateScrollValue(data) {
        this.scrollProgress += data.delta;
        this.incrementPosition(0, UnitConverter.pixelsToRatioY(data.delta));
    }

    module.exports = ActorView;
});
