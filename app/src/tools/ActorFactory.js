define(function(require, exports, module) {
    'use strict';
    var ActorView     = require('views/ActorView');
    var UnitConverter = require('tools/UnitConverter');
    var Surface       = require('famous/core/Surface');
    var ImageSurface  = require('famous/surfaces/ImageSurface');

    function ActorFactory() {
          // Container to store created actors by name.
          this.actors = {};
    }

    ActorFactory.prototype.makeActor = function(name, type, content, classes, properties, size, opacity, scrollStart, scrollStop) {
        var newSurface;

        // Ensure backface visibility is set for all new surfaces.
        if (!classes) {
            classes = ['backfaceVisibility'];
        } else {
            classes.push('backfaceVisibility');
        }

        if (type === 'html') {
            newSurface = new Surface({
                size: size,
                content: content,
                properties: properties,
                classes: classes
            });
        }

        if (type === 'image') {
            newSurface = new ImageSurface({
                size: size,
                content: content,
                properties: properties,
                classes: classes
            });
        }

        var newActor = new ActorView({
            name: name,
            zPosition: properties.zPosition,
            opacity: opacity !== undefined ? opacity : 1
        });

        newActor.addSurface(newSurface);

        this.actors[name] = newActor;

        return newActor;
    };

    ActorFactory.prototype.getActor = function(name) {
        return this.actors[name];
    };

    module.exports = ActorFactory;
});
