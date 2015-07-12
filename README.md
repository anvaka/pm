# Software Galaxies

This repository combines visualizations of major software package managers.
This is supposed to be shown at http://2015.cascadiajs.com/browser/

**After conference update**

Friends, you are awesome! I can't express how much I appreciate all your 
kind words and warm feedback. It really means a world for me. Thank you!

The slides are available here: http://anvaka.github.io/talks/cascadia2015/#/
And links to visualizations are below. Before the links,
quick keyboard bindings info:

# Operating Manual

Very detailed information about what you, and how to use it is available here:
[Software Galaxies Documentation](https://github.com/anvaka/pm/tree/master/about#software-galaxies-documentation)

Here I just menion most important navigation information.

### If you are browsing from the phone

* One finger touch - move forward
* Two fingers touch - move backward
* Rotate device to control the view port

### If you are browsing from device with keyboard:

|    |    |    |   |
|---:|:---|---:|---|
| `W`  | Move forward  | `Up` |Rotate up|
| `S`  | Move backward  | `Down`  |Rotate down |
| `A`  | Move left  |`Left`|Rotate left|
| `D`  | Move right  |`Right` | Rotate right|
| `Q`  | Roll right  |`R` | Fly up|
| `E`  | Roll left  |`F` | Fly down|
| `L`  | Toggle links  | `Shift` | Hold it to slow down |


# Visualizations

Each graph is indexed individually, and data is pushed to `gh-pages` branch
of [galactic-data](https://github.com/anvaka/galactic-data).

## Bower

* Indexed by [allbower](https://github.com/anvaka/allbower)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/bower?l=1)

## PHP Composer

* Indexed by [allcomposer](https://github.com/anvaka/allcomposer)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/composer?l=1)

## Ruby gems

* Indexed by [allgems](https://github.com/anvaka/allgems)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/rubygems?l=1)

## npm

* Indexed by [allnpm](https://github.com/anvaka/allnpm)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/npm?l=1)

## go

* Indexed by [allgo](https://github.com/anvaka/allgo)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/gosearch?l=1)

# local development

```
git clone https://github.com/anvaka/pm
cd pm
npm i
npm start
```

This will start local development sever with auto-rebuild. 

## Your own graphs

This section has detailed instructions about how to use the tool
with your own graphs. Before you read any further, if your graph
is smaller than 10k nodes, consider using [ngraph.pixel](https://github.com/anvaka/ngraph.pixel)
or [VivaGraph](https://github.com/anvaka/VivaGraphJS) both should
be able to provide interactive layout.

If your graphs are larger than this, then keep reading.

### Graph

First, you will need a graph in [ngraph.graph](https://github.com/anvaka/ngraph.graph)
format. The `ngraph.graph` has detailed documentation about how to create graph,
but it also has several loaders from popular graph formats (e.g. [dot](https://github.com/anvaka/ngraph.fromdot),
[gexf](https://github.com/anvaka/ngraph.gexf))

### Layout

Now that you have a graph we need to compute the layout.

If your graph is smaller than 200k nodes, consider using [ngraph.offline.layout](https://github.com/anvaka/ngraph.offline.layout). This module was
created exactly for the purpose of the `pm` project, it is well documented, and
should be easy to get started with. You can also read `layout.js` of `all[gems|go|bower]`
packages to see more examples.

If your graph is much larger than 200k nodes, then consider using
[ngraph.native](https://github.com/anvaka/ngraph.native) - this module
is harder to work with (as it requires C++ knowledge), but it is much
faster. 

The secret GitHub visualization is using [ngraph.native](https://github.com/anvaka/ngraph.native).

### Data format

Once layout is computed, we are ready to visualize. Just save the graph using
[ngraph.tobinary](https://github.com/anvaka/ngraph.tobinary#ngraphtobinary)
and store it along with latest positions file (produced by layout) into a folder.

Follow the same folder structure as in [`galactic-data`](https://github.com/anvaka/galactic-data/tree/gh-pages/npm).

Update the [config.js](https://github.com/anvaka/pm/blob/master/src/config.js) in
this repository to point to your data server, and you are ready to explore
your own graph.

# The secret visualization

The last shown visualization was secret GitHub followers visualization.
It shows all GitHub users who has more than two followers.

The visualization has more than 1,100,000 nodes, and renders
at 60 fps when flying around. The FPS drops when you hover-over
nodes to 20-30, This is because we are doing hit-testing,
to find what's under cursor.

With this many nodes, it runs well in the browser. Unfortunately
it requires more than 1GB of RAM. Which may or may not crash
your phone browser - sorry about this.

With all warnings said, here are the links:
* Indexed by [allgithub](https://github.com/anvaka/allgithub)
* [Live demo](http://anvaka.github.io/pm/#/galaxy/github?l=1)

# Feedback

Please do not hesitate to provide your feedback or bug fixes.
Even if it is something small like fixing a typo - I'd be glad to
hear from you!
