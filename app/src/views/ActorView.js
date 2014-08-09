define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var ModifierChain = require('famous/modifiers/ModifierChain');

    function ActorView() {
        View.apply(this, arguments);
        this.initialY = 0;

        _buildDemoContent.call(this);
    }

    ActorView.DEFAULT_OPTIONS = {

    };

    

    ActorView.prototype = Object.create(View.prototype);
    ActorView.prototype.constructor = ActorView;

    function _buildDemoContent() {
        this.mainSurface = new Surface({
            size: [200, 200],
            content: 'This is a demo',
            properties: {
                backgroundColor: 'blue'
            }
        });

        this.demoModifierChain = new ModifierChain();

        this.translateModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: function() {
                return Transform.translate(0, this.initialY, 0);
            }.bind(this)
        });

        this.opacityModifier = new Modifier({
          opacity: function () {
            return Math.max(0, -this.initialY / 1000);
          }.bind(this)
        });

        this.demoModifierChain.addModifier(this.opacityModifier);
        this.demoModifierChain.addModifier(this.translateModifier);

        this.add(this.demoModifierChain).add(this.mainSurface);

        this._eventInput.on('ScrollUpdated', moveWithScroll.bind(this));
    }

    function moveWithScroll(data) {
        // this.initialModifier.transformFrom(Transform.translate(0, data.delta, 0));
        this.initialY += data.delta;
        window.console.log('Actor - Scroll Updated');
    }

    module.exports = ActorView;
});
