var base_map=document.getElementById('background_map')
function removeMap(){
    base_map.style.backgroundImage="url('')"
}

// var elementList=[]
var i=0
function createAllElments(name){
    var i=Math.floor(Math.random() * 5.9)
    var img_name=name+i+'.png'
    var img_url='img/newImg/'+ img_name

    // const new_div=document.createElement('div');
    // new_div.className='movable photo';
    // const new_sub_div=document.createElement('div');
    // new_sub_div.id = i
    // new_sub_div.className='photo_frame';
    const img = document.createElement('img');

    img.setAttribute('class', 'movable')
    img.setAttribute('src', img_url)
    img.style.width = '100px'
    // img.style.left = '100px'
    // img.style.top = '300px'
    // var w = img.width
    // img.className='movable photo photo_frame'
    // new_sub_div.appendChild(img)
    // new_div.appendChild(new_sub_div)
    document.getElementById("img_canvas").appendChild(img);
    // document.body.appendChild(img)
    updateMovable()
    // console.log(new_div.className)
    // console.log(new_sub_div.className)
    // console.log(w)
    // console.log(img.parentElement)
    // console.log(img.parentElement.parentElement)
    // console.log(img.parentElement.parentElement.parentElement)

    // document.
    // document.getElementById(i).write(name)
    // i++

    // var text_ele=document.write("<p>hjhkh</p>")
    // // text_ele.innerText=name
    // document.getElementById('body').appendChild(text_ele)
}