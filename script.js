const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");
let synth = speechSynthesis,
isSpeaking = true
voices();
function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected": "";
        //console.log(voice);
        //passing voice and voice language
        let option = `<option value="${voice.name}"
        ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend",option); //inserting the option tag
    }
}
synth.addEventListener("voiceschanged",voices);
function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
// if the avaliable voice matches with user selected voice than it set that voice
        if(voice.name === voiceList.value){
            utternance.voice = voice
        }
    }
    speechSynthesis.speak(utternance) //speak the text
}
speechBtn.addEventListener("click",e =>{
    e.preventDefault();
    if(textarea.value === ""){
        if(!synth.speaking){
            //if speech is not active it will activate
        textToSpeech(textarea.value)
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar fala"
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Contiunar fala"
            }

            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Converter para Fala"
                }
            })
        }else{
            speechBtn.innerText = "Converter para Fala";
        }
    }
})