#scrollster
> Component for impressive scroll-based animations using the power of Famo.us.

## Introduction
Famo.us is a powerful platform for web front-end development. However, with that power comes a necessary amount of complexity. This makes it difficult for newer developers to approach Famo.us and take advantage of some of it’s unique capabilities.

This component provides a simpler, declarative JSON-style api to allow you to drop-in the component and create impressive animations.

To work with the component you specify two type of Javascrip enteties: actors and actions.

An actor represents the item displayed in the UI and looks like this:

```
'Demo Actor': { // String name of the actor
    type: 'html', // Type of actor to display (currently html or image)
    content: 'Hi!', // Content to display within the actor
    size: [100, 100], // The initial size of the actor when it first appears in pixels
    position: [800, 200], // The initial position of the actor within the world in pixels
    classes: ['z1'], // An array of class names to add to the actor.
    properties: {  // A collection of CSS style properties to actor
        fontSize: '2em',
        padding: '.5em',
        backfaceVisibility: 'visible',
        backgroundColor: 'blue'
    }
}
```

This one creates a 100 x 100 pixel element with a blue background color and the text "Hi!." It initially appears 800 pixels from the left and 200 pixels from the top and has the class z1 applied to it.

And this is what an action looks like:
```
{
    actor: 'Demo Actor', // Which actor this action applies to
    start: 600, // How far along the scroll to start applying this action
    stop: 1000, // How far along the scroll to stop applying this action
    type: 'moveTo', // The type of action. (moveTo makes the option move from where it is to the specified location)
    properties: {
        location: [720, 450], // The destination in pixels
        curve: 'easeOutBounce' // A curve to apply (whether the item goes there directly or changes speed as it goes)
    }
},
```
This action waits until the scroll has progressed 600 units. Then it moves the actor from wherever it is to the position x: 720 and y: 450. The actor will arrive at that location at 1000 units of scroll. The curve describes how directly the actor travels. A linear curve moves to the new position at a constant rate. The easeOutBounce curve starts moving quickly, slows at it gets close to the destination, and then briefly overshoots the destination before snapping back.

See the wiki for further documentation.

##Dependencies
It is actually quite simple really

First make sure you have node.js installed... without that nothing works!  You can either install it with your favorite package manager or with [the installer](http://nodejs.org/download) found on [nodejs.org](http://nodejs.org).

This project relies on grunt-cli, and bower to do all the heavy lifting for you

```
npm install -g grunt-cli bower
```

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

*This option is currently borked...*
You can also change the port livereload is running on with the option ```--livereload=8675309```
*... if you think you can fix it check out the [issue on github](https://github.com/Famous/generator-famous/issues/22)*

If you would like to have your server be accessible to other devices on your local machine use the option ```--hostname=0.0.0.0```

##Production

If you would like to compile your project for distribution simply run the command ```grunt``` to build ```dist/``` which will be a deployment ready version of your app.  Preprocessing will be applied to html, all js will be concatenated and minified.  All js / css assets will also have their name prepended with a hash for cache busting.

##Why are styles so strict?

While the default style guidelines are fairly strict, we are doing so with reason.  Famo.us is not only a framework for creating cutting edge web application, but a community project that we are all going to contribute to in the hopes of making the web better.  We truly believe that having consistent style within the community will make it easier for individuals to jump between different Famo.us modules without having to waste valuable time on processing style.

While our Package Manager (which is currently in development) will enforce our style guide if you would like to publish a module, feel free to disable eslint or jscs as you see fit.  If you want to disable linting you will need to comment out lines 18 - 19 in ```grunt/aliases.js```

## Contributing
All contributions are welcome! The simplest way to show your support for this project is to **"star" it**.

##License
ISC

## Release History
 * 2014-08-08   v0.1.0   Generated by the [Yeoman Generator](https://github.com/famous/generator-famous) for [Famo.us](http://famo.us)