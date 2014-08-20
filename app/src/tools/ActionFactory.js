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
            newAction = new MoveToModifier({actor: actor,
                                            scrollStart: scrollStart,
                                            scrollStop: scrollStop,
                                            curveFn: properties.curveFn,
                                            pixelsStopX: properties.location[0],
                                            pixelsStopY: properties.location[1]});
        } else if (type === 'position') {
            newAction = new PositionModifier({actor: actor,
                                              scaleX: properties.scaleX,
                                              scaleY: properties.scaleY,
                                              scrollStart: scrollStart,
                                              scrollStop: scrollStop});
        } else if (type === 'rotateTo') {
            newAction = new RotateToModifier({actor: actor,
                                              scrollStart: scrollStart,
                                              scrollStop: scrollStop,
                                              curveFn: properties.curveFn,
                                              axis: properties.axis,
                                              angleInDegrees: properties.angleInDegrees});
        } else if (type === 'rotate') {
            newAction = new RotateModifier({actor: actor,
                                            scrollStart: scrollStart,
                                            scrollStop: scrollStop,
                                            axis: properties.axis,
                                            scale: properties.scale});
        } else if (type === 'opacity') {
            newAction = new OpacityModifier({actor: actor,
                                             scrollStart: scrollStart,
                                             scrollStop: scrollStop,
                                             curveFn: properties.curveFn,
                                             finalOpacity: properties && properties.finalOpacity !== undefined ? properties.finalOpacity : 1});
        } else if (type === 'scale') {
            newAction = new ScaleModifier({scrollStart: scrollStart,
                                           scrollStop: scrollStop,
                                           curveFn: properties.curveFn,
                                           changeRatioX: properties.changeRatioX,
                                           changeRatioY: properties.changeRatioY});
        } else if (type === 'skew') {
            newAction = new SkewModifier({scrollStart: scrollStart,
                                          scrollStop: scrollStop,
                                          curveFn: properties.curveFn,
                                          scaleX: properties.scaleX || 0,
                                          scaleY: properties.scaleY || 0,
                                          scaleZ: properties.scaleZ || 0});
        }

        actor.addModifier(newAction);

        _saveAction.call(this, actor, newAction);

        return newAction;
    };

    ActionFactory.prototype.getActionsForActor = function(actorName) {
        return this.actionsForActor[actorName];
    };

    // Used for comparing actions and making sure they are sorted in the right order.
    // In order to behave as expected, scaling must happen before rotation.
    // All others can be composed freely and follow scaling / rotation
    // This won't be a stable sort, but stability doesn't seem to make much difference for this.
    ActionFactory.prototype.actionComparator = function(actionA, actionB) {
        if (actionA.type === 'scale') {
            return -1;
        }
        if (actionB.type === 'scale') {
            return 1;
        }
        if (actionA.type === 'rotate' || actionA.type === 'rotateTo') {
            return -1;
        }
        if (actionB.type === 'rotate' || actionB.type === 'rotateTo') {
            return 1;
        }
        return 0;
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
