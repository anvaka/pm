# Software Galaxies Documentation

Software Galaxies visualizes dependencies among most popular package managers.
Every star in this visualization represents a package.

## What do I see here?

![Go packages](https://raw.githubusercontent.com/anvaka/pm/master/images/go_image.png)

Every dot here is a package. Position of a package is determined by
force based graph layout algorithm and usually clusters together packages
that depend on each other.

Some packages are connected by lines. It means one package depend on another.
Image above shows only very close connections. We can also see all connections,
but the image becomes obscure by amount of connections. Click on the image below
to see a video demo:

![Go packages with edges](https://raw.githubusercontent.com/anvaka/pm/master/images/go_image_all_links.png)

## Navigating in the space

The primary focus of these visualization is exploratory discovery. It works
best on large monitor, but also works on mobile devices. Use `one finger touch`
to fly forward, `two fingers touch` to fly backward. Rotate your device
to look around:

[![Mobile Navigation in Software Galaxies ](http://img.youtube.com/vi/iWr-4U9tyTM/0.jpg)](http://www.youtube.com/watch?v=iWr-4U9tyTM)

If you are on the desktop, you can use `mouse wheel` to bring up keyboard map:

|    |    |    |   |
|---:|:---|---:|---|
| `W`  | Move forward  | `Up` |Rotate up|
| `S`  | Move backward  | `Down`  |Rotate down |
| `A`  | Move left  |`Left`|Rotate left|
| `D`  | Move right  |`Right` | Rotate right|
| `Q`  | Roll right  |`R` | Fly up|
| `E`  | Roll left  |`F` | Fly down|
| `L`  | Toggle links  | `Space` | Toggle steering |

I personally prefer to fly with steering mode on (`spacebar` activates it). In
this mode the spaceship will follow your mouse cursor:

![Steering mode](https://raw.githubusercontent.com/anvaka/pm/master/images/pm_steering.gif)

With this keyboard navigation you can fly far far away.

## About connections

I mentioned above that some packages are rendered with links. But why don't we
render them all? It's because we will see a beautiful hairball monster, which
is nice, but obscures the galaxy very much:

![All links](https://raw.githubusercontent.com/anvaka/pm/master/images/go_all_links_away.png)

You can also toggle the links display (using `L` key):

![no links](https://raw.githubusercontent.com/anvaka/pm/master/images/go_all_links_hidden.png)

But then we will loose sight of smaller communities. Thus by default I'm showing
only links whose length is shorter than 150 pixels:

![some links](https://raw.githubusercontent.com/anvaka/pm/master/images/go_some_links.png)

The minimal length of visible links is controlled by `ml` query string argument
(need to open in new tab with updated value to see the result). This will be
changed in future versions of the Software Galaxies Explorer.


# Searching

Search box can be used to locate a start in the graph. The input box accepts
regular expression: If you type `.` it will match all names, and show all results.

Unfortunately for larger graphs (with more than 1,000,000 nodes) this may result
in terrible performance and should be improved in the future.


# Found a bug? Have a suggestion? Feature Requests?

I need your help very much! Please, [open a new issue](https://github.com/anvaka/pm/issues/new)
if you have a suggestion, feature request or found a bug.

I wish you joyful exploration, Commander!
