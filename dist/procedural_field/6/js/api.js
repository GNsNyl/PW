// Find all of the objects that are paintings and have the word "rabbit" in the title
let apiEndpointBaseURL,queryString;
let typeDefault='object';
apiEndpointBaseURL = "https://api.harvardartmuseums.org/object"
function getAPItype(type){
    typeDefault=type
    apiEndpointBaseURL = "https://api.harvardartmuseums.org/"+typeDefault;

}
function getTitle(){
    var keyword=document.getElementById("inputKey").value;
// console.log(keyword)
    queryString = $.param({
        apikey: "2f0bbd9c-22a8-4eac-ae28-b74b82506a07",
        title: keyword,
        classification: "Paintings"
    });
    // console.log(queryString)
}
let imageUrl,gallery;
gallery=document.getElementById('gallery')

// function getAPIImage(){
// $.getJSON(apiEndpointBaseURL + "?" + queryString, function(data) {
//     imageUrl=data.records[0].images[0].baseimageurl
//     toDataURL(imageUrl,asignSrc)
// });}
// console.log(imageUrl)
function getAPIImage(){
    $.getJSON(apiEndpointBaseURL + "?" + queryString, function(data) {
        gallery.innerHTML='';
        for(let i=0; i<data.records.length;i++){
            var datum=data.records[i]
            // console.log(data.records[i])
            var figure=document.createElement('figure');
            figure.style.width='200px';
            var figCap=document.createElement('figcaption');
            figCap.style.width=200
            figCap.innerHTML="<h2>"+datum.title+"</h2><h3>"+datum.people[0].name+"</h3>"
            var eachUrl=data.records[i].primaryimageurl;
            var eachImg=document.createElement('img');
            eachImg.src=eachUrl;
            eachImg.className='galleryImg';
            eachImg.setAttribute('onclick','selectUrl("'+eachUrl+'");');
            gallery.appendChild(figure)
            figure.appendChild(eachImg)
            figure.appendChild(figCap)
            // gallery.appendChild(eachImg)
            // gallery.appendChild(figCap)

        }
        // imageUrl=data.records[0].images[0].baseimageurl
        // toDataURL(imageUrl,asignSrc)
    });}

function selectUrl(selectedUrl){
    console.log(selectedUrl)
    imageUrl=selectedUrl
    toDataURL(imageUrl,asignSrc)
}
function asignSrc(url){
    document.getElementById('test-image').src=url;
}