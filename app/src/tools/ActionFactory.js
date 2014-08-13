define(function(require, exports, module) {
    'use strict';
    var MoveToModifier     = require('modifiers/MoveToModifier');
    var OpacityModifier    = require('modifiers/OpacityModifier');
    var PositionModifier   = require('modifiers/PositionModifier');
    var RotateModifier     = require('modifiers/RotateModifier');
    var RotateToModifier   = require('modifiers/RotateToModifier');

    function ActionFactory() {
          // Container to store created actors by name.
          this.actionsForActor = {};
    }

    ActionFactory.prototype.makeAction = function(actor, type, scrollStart, scrollStop, properties) {
        var newAction;

        if (type === 'moveTo') {
            newAction = new MoveToModifier(actor, scrollStart, scrollStop, properties.location[0], properties.location[1]);
        } else if (type === 'position') {
            newAction = new PositionModifier(actor, properties.scaleX, properties.scaleY, scrollStart, scrollStop);
        } else if (type === 'rotateTo') {
            newAction = new RotateToModifier(actor, scrollStart, scrollStop, properties.axis, properties.angleInDegrees);
        } else if (type === 'rotate') {
            newAction = new RotateModifier(actor, scrollStart, scrollStop, properties.axis, properties.scale);
        } else if (type === 'opacity') {
            newAction = new OpacityModifier(scrollStart, scrollStop);
        }

        _saveAction.call(this, actor, newAction);

        return newAction;
    };

    ActionFactory.prototype.getActionsForActor = function(actorName) {
        return this.actionsForActor[actorName];
    };

    function _saveAction(actor, action) {
        if (!this.actionsForActor[actor.name]) this.actionsForActor[actor.name] = [];
        this.actionsForActor[actor.name].push(action);
    }

    module.exports = ActionFactory;
});
