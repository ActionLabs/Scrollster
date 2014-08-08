define(function(require, exports, module) {
    'use strict';
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');

    var GenericSync   = require('famous/inputs/GenericSync');
    var MouseSync     = require('famous/inputs/MouseSync');
    var TouchSync     = require('famous/inputs/TouchSync');

    GenericSync.register({
        'mouse': MouseSync,
        'touch': TouchSync
    });


    function WorldScrollView() {
        View.apply(this, arguments);

        _handleScroll.call(this);
        _setupScrollInfoSurface.call(this);
    }

    WorldScrollView.DEFAULT_OPTIONS = {

    };

    WorldScrollView.prototype = Object.create(View.prototype);
    WorldScrollView.prototype.constructor = WorldScrollView;

    function _handleScroll() {
        var sync = new GenericSync(
            ['mouse', 'touch'],
            {direction: GenericSync.DIRECTION_Y}
        );

        sync.on('update', function(data) {
            console.log('Scroll update recieved');
        }.bind(this));

        sync.on('end', function(data) {
            console.log('Scroll end recieved');
        }.bind(this));
    }

    function _setupScrollInfoSurface() {
        this.scrollInfo = new Surface({
            size: [200, 200],
            content: 'Scroll Value: '
        });

        this.add(this.scrollInfo);
    }
 
    module.exports = WorldScrollView;
});
