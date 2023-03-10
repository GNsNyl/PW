var text = new PointText({
    position: view.center + [0, 175],
    fillColor: 'black',
    justification: 'center',
    fontSize: 16,
    font: "Helvetica",
    fontWeight: "150",
});
var text2 = new PointText({
    position: view.center + [0, 195],
    fillColor: 'black',
    justification: 'center',
    fontSize: 16,
    font: "Helvetica",
    fontWeight: "100",
});
text2.content= 'web based participatory design'

text.content='INTER-ACT '

var originals = new Group({ insert: false }); // Don't insert in DOM.

var square = new Path.Rectangle({
    position: view.center,
    size: 200,
    parent: originals,
    fillColor: 'white'
});

// Make a ring using subtraction of two circles:
var inner = new Path.Circle({
    center: view.center,
    radius: 80,
    parent: originals,
    fillColor: 'white'
});

var outer = new Path.Circle({
    center: view.center,
    radius: 120,
    parent: originals,
    fillColor: 'white'
});

var ring = outer.subtract(inner);

var operations = ['unite', 'intersect', 'subtract', 'exclude', 'divide'];
var colors = ['red', 'green', 'blue', 'black'];
var curIndex = -1;
var operation, result, activeItem;

// Change the mode every 3 seconds:
setInterval(setMode, 3000);

// Set the initial mode:
setMode();

function setMode() {
    curIndex++;
    if (curIndex == operations.length * 2)
        curIndex = 0;
    operation = operations[curIndex % operations.length];
}

function onMouseDown(event) {
    var hitResult = originals.hitTest(event.point);
    activeItem = hitResult && hitResult.item;
}

function onMouseDrag(event) {
    if (activeItem)
        activeItem.position = event.point;
}

function onMouseUp() {
    activeItem = null;
    square.position = view.center;
}

function onFrame(event) {
    if (activeItem != ring) {
        // Move the ring around:
        var offset = new Point(140, 80) * [Math.sin(event.count / 60), Math.sin(event.count / 40)];
        ring.position = view.center + offset;
    }

    // Remove the result of the last path operation:
    if (result)
        result.remove();

    // Perform the path operation on the ring:
    if (curIndex < operations.length) {
        result = square[operation](ring);
        // text.content = 'square.' + operation + '(ring)';
    } else {
        result = ring[operation](square);
        // text.content = 'ring.' + operation + '(square)';
    }
    result.selected = true;
    result.fillColor = colors[curIndex % colors.length];
    result.moveBelow(text);

    // If the result is a group, color each of its children differently:
    if (result instanceof Group) {
        for (var i = 0; i < result.children.length; i++) {
            result.children[i].fillColor = colors[i];
        }
    }
};

function onResize() {
    text.position = view.center + [0, 175];
    text2.position = view.center + [0, 195];
    square.position = view.center;
}