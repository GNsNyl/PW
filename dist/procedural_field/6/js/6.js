var pixels,hsvData=[];

function toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    image.src = src;
    if (image.complete || image.complete === undefined) {
        image.src = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        image.src = src;
    }
}

function getImgData() {
    CANVAS = document.getElementById("myCanvas");
    IMG = document.getElementById('test-image')
    IMG.setAttribute('crossOrigin', '');
    CTX = CANVAS.getContext("2d");
    CTX.drawImage(IMG, 0, 0,IMG.width, IMG.height,0,0,CANVAS.width,CANVAS.height);
    pixels = CTX.getImageData(0, 0, IMG.width, IMG.height).data;

    for (let i = 0; i < pixels.length / 4; i++) {
        var r = pixels[i]
        var g = pixels[i + 1]
        var b = pixels[i + 2]
        // var a=imgData.data[i+3]
        // var rgba=(r,g,b,a)
        var hsv = rgb2hsv(r, g, b)
        hsvData.push(hsv)

    }
    console.log(hsvData)

}

// create dropdown

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}