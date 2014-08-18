define(function(require, exports, module) {
    'use strict';
    var ActorFactory       = require('tools/ActorFactory');
    var ActionFactory      = require('tools/ActionFactory');

    function Director() {
        this.actors = {}; // Collection of actors by name.
    }

    Director.prototype.populateStage = function(stage, actorDescriptions, actionDescriptions) {
        var actorFactory = new ActorFactory();
        var actionFactory = new ActionFactory();

        for (var actorName in actorDescriptions) {
            if (actorDescriptions[actorName].type) {
                actorDescriptions[actorName].properties.zIndex = actorDescriptions[actorName].zIndex;
            }
            var newActor = actorFactory.makeActor(actorName,
                                                  actorDescriptions[actorName].type,
                                                  actorDescriptions[actorName].content,
                                                  actorDescriptions[actorName].classes,
                                                  actorDescriptions[actorName].properties,
                                                  actorDescriptions[actorName].size
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

    module.exports = Director;
});
