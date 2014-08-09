define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var ModifierChain = require('famous/modifiers/ModifierChain');

    function ActorView() {
        View.apply(this, arguments);
        this.modifiers = [];
        this.modifierChain = new ModifierChain();
        this.initialY = 0;

        _buildDemoContent.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {

    };

    ActorView.prototype = Object.create(View.prototype);
    ActorView.prototype.constructor = ActorView;

    ActorView.prototype.addModifier = function(newModifier) {
        this.modifiers.push(newModifier);
        this.modifierChain.addModifier(newModifier);
    };

    function _buildDemoContent() {
        this.mainSurface = new Surface({
            size: [200, 200],
            content: 'This is a demo',
            properties: {
                backgroundColor: 'blue'
            }
        });

        this.add(this.modifierChain).add(this.mainSurface);

        this._eventInput.on('ScrollUpdated', moveWithScroll.bind(this));
    }

    function moveWithScroll(data) {
        // this.initialModifier.transformFrom(Transform.translate(0, data.delta, 0));
        this.initialY += data.delta;
    }

    module.exports = ActorView;
});
