const instrument=['cello','hi-hat','hang','saxophone','violin','shakuhachi','suona','uillean_pipes','viola']
const sound=['cello.wav','hi-hat.wav','hang.m4a','saxophone.wav','violin.wav','saxophone.wav','suona','uillean_pipes','Viola']

var buttonContainer = document.getElementById('buttons');
var audioContainer = document.getElementById('audios');

for(let i=0;i<sound.length;i++){
    const audio = document.createElement("audio");
    audio.setAttribute("id", sound[i]);
    audio.setAttribute('src','sound/'+sound[i])
    audioContainer.appendChild(audio);}

for(let i=0;i<instrument.length;i++){
    const newbtn = document.createElement("button");
    newbtn.setAttribute('class','btn-class')
    const btnImg = document.createElement("img");
    btnImg.setAttribute('src','img/instrument/'+instrument[i]+'.png');
    btnImg.setAttribute('width','100px')

    newbtn.appendChild(btnImg)
    newbtn.setAttribute("id", instrument[i]);
    buttonContainer.appendChild(newbtn);
}

document.querySelectorAll('.btn-class').forEach(item => {
    item.addEventListener('mouseover', function() {
        var index=instrument.indexOf(item.id);
        var newaudio = document.getElementById(sound[index]);
        console.log(newaudio)
        newaudio.play()
    }, );
    item.addEventListener('mouseleave', function() {
        var index=instrument.indexOf(item.id);
        var newaudio = document.getElementById(sound[index]);
            newaudio.pause();
            newaudio.currentTime = 0;
        }, false);
})
