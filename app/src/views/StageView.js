define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');

    var GenericSync   = require('famous/inputs/GenericSync');
    var MouseSync     = require('famous/inputs/MouseSync');
    var TouchSync     = require('famous/inputs/TouchSync');
    var ScrollSync    = require('famous/inputs/ScrollSync');

    var ActorView     = require('views/ActorView');

    GenericSync.register({
        'mouse': MouseSync,
        'touch': TouchSync,
        'scroll': ScrollSync
    });

    function StageView() {
        View.apply(this, arguments);
        this.worldScrollValue = 0;

        _setupScrollRecieverSurface.call(this);
        _setupScrollInfoSurface.call(this);
        _handleScroll.call(this);
        _createDemoActor.call(this);
    }

    StageView.DEFAULT_OPTIONS = {

    };

    StageView.prototype = Object.create(View.prototype);
    StageView.prototype.constructor = StageView;

    function _setupScrollRecieverSurface() {
        this.scrollRecieverSurface = new Surface({
            size: [undefined, undefined] // Take up the entire view
        });

        this.add(this.scrollRecieverSurface);
    }

    function _setupScrollInfoSurface() {
        this.scrollInfo = new Surface({
            size: [200, 200],
            content: 'Scroll Value: ',
            properties: {
                backgroundColor: 'white'
            }
        });

        this.add(this.scrollInfo);
    }

    function _handleScroll() {
        this.sync = new GenericSync(
            ['touch', 'scroll'],
            {direction: GenericSync.DIRECTION_Y}
        );

        this.scrollRecieverSurface.pipe(this.sync);
        this.scrollInfo.pipe(this.sync);

        this.sync.on('update', function(data) {
            this.worldScrollValue += data.delta;
            this.scrollInfo.setContent('Scroll Value: ' + this.worldScrollValue);
            this._eventOutput.emit('ScrollUpdated', {delta: data.delta});
        }.bind(this));

        this.sync.on('end', function(data) {
        }.bind(this));
    }

    function _createDemoActor() {
        var demoActor = new ActorView();

        demoActor.mainSurface.pipe(this.sync);
        demoActor.subscribe(this._eventOutput);

        var translateModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: function() {
                if (this.initialY > -300 || this.initialY < -900) {
                    return Transform.translate(0, 0, 0);
                } else {
                    return Transform.translate(0, this.initialY+300, 0);
                }
            }.bind(demoActor)
        });

        var opacityModifier = new Modifier({
            opacity: function() {
                return Math.max(0, -this.initialY / 100);
            }.bind(demoActor)
        });

        demoActor.addModifier(translateModifier);
        demoActor.addModifier(opacityModifier);

        this.add(demoActor);

        // **** second demonstraton actor

        var demoActor2 = new ActorView();

        demoActor2.mainSurface.pipe(this.sync);
        demoActor2.subscribe(this._eventOutput);

        var translateModifier2 = new Modifier({
            align: [0.10, .75],
            origin: [1.0, 0.0],
            transform: function() {
                return Transform.translate(-this.initialY*50, this.initialY * 8, 0);
            }.bind(demoActor2)
        });

        var spinModifier2 = new Modifier({
            transform: function() {
                return Transform.rotateY(Math.abs(this.initialY/250) * 3.1415962);
            }.bind(demoActor2)
        });

        demoActor2.addModifier(translateModifier2);
        demoActor2.addModifier(spinModifier2);

        this.add(demoActor2);
    }

    module.exports = StageView;
});
