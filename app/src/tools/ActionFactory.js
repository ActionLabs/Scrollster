define(function(require, exports, module) {
    'use strict';
    var MoveToModifier     = require('modifiers/MoveToModifier');
    var OpacityModifier    = require('modifiers/OpacityModifier');
    var PositionModifier   = require('modifiers/PositionModifier');
    var RotateModifier     = require('modifiers/RotateModifier');
    var RotateToModifier   = require('modifiers/RotateToModifier');
    var ScaleModifier      = require('modifiers/ScaleModifier');
    var SkewModifier       = require('modifiers/SkewModifier');
    var TweenTransition    = require('famous/transitions/TweenTransition');
    var Easing             = require('famous/transitions/Easing');

    function ActionFactory() {
          // Container to store created actors by name.
          this.actionsForActor = {};
    }

    ActionFactory.prototype.makeAction = function(actor, type, scrollStart, scrollStop, properties) {
        var newAction;

        if (!properties) properties = {};

        _setupTweenCurve(properties);

        if (type === 'moveTo') {
            newAction = new MoveToModifier(actor, scrollStart, scrollStop, properties.curveFn, properties.location[0], properties.location[1]);
        } else if (type === 'position') {
            newAction = new PositionModifier(actor, properties.scaleX, properties.scaleY, scrollStart, scrollStop);
        } else if (type === 'rotateTo') {
            newAction = new RotateToModifier(actor, scrollStart, scrollStop, properties.curveFn, properties.axis, properties.angleInDegrees);
        } else if (type === 'rotate') {
            newAction = new RotateModifier(actor, scrollStart, scrollStop, properties.axis, properties.scale);
        } else if (type === 'opacity') {
            newAction = new OpacityModifier(scrollStart, scrollStop, properties.curveFn, properties ? properties.fadeOut : undefined);
        } else if (type === 'scale') {
            newAction = new ScaleModifier(scrollStart, scrollStop, properties.curveFn, properties.changeRatioX, properties.changeRatioY);
        } else if (type === 'skew') {
            newAction = new SkewModifier(scrollStart, scrollStop, properties.curveFn, properties.phi, properties.theta, properties.psi);
        }

        actor.addModifier(newAction);

        _saveAction.call(this, actor, newAction);

        return newAction;
    };

    ActionFactory.prototype.getActionsForActor = function(actorName) {
        return this.actionsForActor[actorName];
    };

    function _setupTweenCurve(properties) {
        // setup tween curve as linear if no curve is defined
        if (!properties.curve) {
            properties.curveFn = TweenTransition.Curves.linear;
        } else {
            // Check the standard transition curves
            properties.curveFn = TweenTransition.Curves[properties.curve];
        }
        if (!properties.curveFn) {
            // Check if it's in the expanded list of easing curves
            properties.curveFn = Easing[properties.curve];
        }
    }

    function _saveAction(actor, action) {
        if (!this.actionsForActor[actor.name]) this.actionsForActor[actor.name] = [];
        this.actionsForActor[actor.name].push(action);
    }

    module.exports = ActionFactory;
});
