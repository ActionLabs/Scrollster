define(function(require, exports, module) {
    'use strict';

    var UnitConverter = {};

    UnitConverter.ratioXtoPixels = function(ratioX) {
      return ratioX * window.innerWidth; // TODO: Change this to be width of container which may not be window.
    };

    UnitConverter.ratioYtoPixels = function(ratioY) {
      return ratioY * window.innerHeight; // TODO: Change this to be width of container which may not be window.
    };

    UnitConverter.pixelsToRatioX = function(pixels) {
      return pixels / window.innerWidth; // TODO: Change this to be width of container which may not be window.
    };

    UnitConverter.pixelsToRatioY = function(pixels) {
      return pixels / window.innerHeight; // TODO: Change this to be width of container which may not be window.
    };

    UnitConverter.degreesToRadians = function(degrees) {
      return degrees * (Math.PI / 180);
    };

    UnitConverter.radiansToDegrees = function(radians) {
      return radians * (180 / Math.PI);
    };

    UnitConverter.percentageToPixelsX = function(percentage) {
      return Math.round(UnitConverter.ratioXtoPixels(percentage / 100));
    };

    UnitConverter.percentageToPixelsY = function(percentage) {
      return Math.round(UnitConverter.ratioYtoPixels(percentage / 100));
    };

    module.exports = UnitConverter;
});
