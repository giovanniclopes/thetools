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
});

/* password generator */

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%&*(){}[]=<>/";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

const generate = document.getElementById("generateBtn");
generate.addEventListener("click", () => {
    const length = document.getElementById("PasswordLength").value;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const result = document.getElementById("PasswordResult");
    result.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatePassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName] ();
        });
    }
    const finalPassword = generatePassword.slice(0, length);
    return finalPassword;
}

let button = document.getElementById("clipboardBtn");
button.addEventListener("click", (e) => {
    e.preventDefault();
    document.execCommand(
        "copy",
        false,
        document.getElementById("PasswordResult").select()
    );
});