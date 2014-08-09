define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var ModifierChain = require('famous/modifiers/ModifierChain');

    function ActorView() {
        View.apply(this, arguments);
        this.modifiers = [];
        this.modifierChain = new ModifierChain();
        this.initialY = 0;

        _listenToScroll.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {
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

    ActorView.prototype.activate = function(scrollSync) {
        if (!this.mainSurface) this.mainSurface = new Surface(this.options.surfaceOptions);

        this.mainSurface.pipe(scrollSync);

        this.add(this.modifierChain).add(this.mainSurface);
    };

    function _listenToScroll() {
        this._eventInput.on('ScrollUpdated', _moveWithScroll.bind(this));
    }

    function _moveWithScroll(data) {
        this.initialY += data.delta;
    }

    module.exports = ActorView;
});
