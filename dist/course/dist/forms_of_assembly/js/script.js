function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // 4/26/2022 Update: This is not quite an example of parallax by some's standards. This was just a simple and incomplete attempt to learn parallax that I thought no one would notice. I did not anticipate this experimental pen to get so many views and I credit the awesomeness of Andre Benz's photography for that completely. 
// ----------------------------------
// A part of my effort to learn parallax.
// Photo Cred: Andre Benz @ https://unsplash.com/@trapnation

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "handleMouseMove",
    e => {
      const el = document.getElementById("wrapper");
      const d = el.getBoundingClientRect();
      let x = e.clientX - (d.left + Math.floor(d.width / 2));
      let y = e.clientY - (d.top + Math.floor(d.height / 2));
      // Invert values
      x = x - x * 2;
      y = y - y * 2;
      document.documentElement.style.setProperty("--scale", 1.6);
      document.documentElement.style.setProperty("--x", x / 2 + "px");

      document.documentElement.style.setProperty("--y", y / 2 + "px");
    });_defineProperty(this, "handleMouseLeave",

    () => {
      document.documentElement.style.setProperty("--scale", 1);
      document.documentElement.style.setProperty("--x", 0);
      document.documentElement.style.setProperty("--y", 0);
    });}
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "wrapper",
        onMouseMove: this.handleMouseMove,
        onClick: this.handleMouseLeave }, /*#__PURE__*/

      React.createElement("img", { id: "image" })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));


// cursor

class BigCircle {
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr")
        this.circle = document.querySelector(".curzr .circle")
        this.dot = document.querySelector(".curzr .dot")

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 100

        this.circleStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            borderRadius: '50%',
            transition: '500ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            zIndex: '2147483647',
            width: '6px',
            height: '6px',
            backgroundColor: '#fffd',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: '250ms, transform 75ms'
        }

        if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
            this.circleStyle.backdropFilter = 'invert(1) grayscale(1)'
            this.circleStyle.backgroundColor = '#fff0'
            this.dotStyle.backdropFilter = 'invert(1) grayscale(1)'
            this.dotStyle.backgroundColor = '#fff0'
        } else {
            this.circleStyle.backgroundColor = '#000'
            this.circleStyle.opacity = '0.45'
            this.dotStyle.backgroundColor = '#fff'
            this.dotStyle.opacity = '0.45'
        }

        this.init(this.circle, this.circleStyle)
        this.init(this.dot, this.dotStyle)
    }

    init(el, style) {
        Object.assign(el.style, style)
        this.cursor.removeAttribute("hidden")

    }

    move(event) {
        this.pointerX = event.pageX
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y

        this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`

        if (event.target.localName === 'button' ||
            event.target.localName === 'a' ||
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
            this.hover()
        }
    }

    hover() {
        this.circle.style.transform += ` scale(1.5)`
    }

    click() {
        this.circle.style.transform += ` scale(0.45)`
        setTimeout(() => {
            this.circle.style.transform = this.circle.style.transform.replace(` scale(0.45)`, '')
        }, 35)
    }

    remove() {
        this.circle.remove()
        this.dot.remove()
    }
}

(() => {
    const cursor = new BigCircle()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.onmousemove = function (event) {
            cursor.move(event)
        }
        document.onclick = function () {
            cursor.click()
        }
    } else {
        cursor.remove()
    }

})()