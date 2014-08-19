define(function(require, exports, module) {
    'use strict';
    var ActorFactory       = require('tools/ActorFactory');
    var ActionFactory      = require('tools/ActionFactory');
    var UnitConverter      = require('tools/UnitConverter');

    function Director() {
        this.actors = {}; // Collection of actors by name.
    }

    Director.prototype.populateStage = function(stage, actorDescriptions, actionDescriptions) {
        var actorFactory = new ActorFactory();
        var actionFactory = new ActionFactory();

        for (var actorName in actorDescriptions) {
            // Make sure the zIndex is included in the properties
            if (actorDescriptions[actorName].zPosition && actorDescriptions[actorName].properties) {
                actorDescriptions[actorName].properties.zPosition = actorDescriptions[actorName].zPosition;
            }

            // Make sure size is in pixels.
            actorDescriptions[actorName].size = _unitsToPixels(actorDescriptions[actorName].size);

            // Make sure position is in pixels.
            if (actorDescriptions[actorName].position) {
                actorDescriptions[actorName].position = _unitsToPixels(actorDescriptions[actorName].position);
            }

            var newActor = actorFactory.makeActor(actorName,
                                                  actorDescriptions[actorName].type,
                                                  actorDescriptions[actorName].content,
                                                  actorDescriptions[actorName].classes,
                                                  actorDescriptions[actorName].properties,
                                                  actorDescriptions[actorName].size,
                                                  actorDescriptions[actorName].opacity
                                                  );
            this.actors[actorName] = newActor;
            newActor.setPositionPixels(actorDescriptions[actorName].position[0], actorDescriptions[actorName].position[1]);
        }

        // Reorder the action descriptions by type, since order matters for
        // some types of actions / modifiers.
        actionDescriptions = actionDescriptions.sort(actionFactory.actionComparator);

        for (var i = 0; i < actionDescriptions.length; i++) {
            var actionDesc = actionDescriptions[i];
            var actor = this.actors[actionDesc.actor];

            // If action takes a location, ensure that it's in pixels
            if (actionDesc.properties && actionDesc.properties.location) {
                actionDesc.properties.location = _unitsToPixels(actionDesc.properties.location);
            }

            actionFactory.makeAction(actor,
                                     actionDesc.type,
                                     actionDesc.start,
                                     actionDesc.stop,
                                     actionDesc.properties
                                    );
        }

        for (var actorToStage in this.actors) {
            var currActor = this.actors[actorToStage];
            stage.addActor(currActor);
        }
    };

    function _unitsToPixels(initial) {
        var result =[];
        for (var i = 0; i <= 1; i++) {
            var checkVal = '' + initial[i]; // cast to string
            // Check if units are percentages and adjust is necessary
            // otherwise units are assumed to be pixels.
            if (checkVal.charAt(checkVal.length - 1) === '%') {
                if (i === 0) {
                    result[i] = UnitConverter.percentageToPixelsX(parseFloat(checkVal.slice(0, checkVal.length - 1)));
                }
                if (i === 1) {
                    result[i] = UnitConverter.percentageToPixelsY(parseFloat(checkVal.slice(0, checkVal.length - 1)));
                }
            } else {
                result[i] = initial[i];
            }
        }
        return result;
    }

    module.exports = Director;
});
