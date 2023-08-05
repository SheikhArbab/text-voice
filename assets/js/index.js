let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector('button').addEventListener('click', () => {
    const textarea = document.querySelector('textarea');
    const textToTranslate = textarea.value;

    googleTranslate(textToTranslate, speech.lang, translatedText => {
        speech.text = translatedText;
        window.speechSynthesis.speak(speech);
    });
});

function googleTranslate(text, targetLang, callback) {
    const googleTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    fetch(googleTranslateUrl)
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0][0][0];
            callback(translatedText);
        })
        .catch(error => {
            console.error('Translation error:', error);
            callback(text); // Fallback to original text
        });
}

// Google Translate API initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );

    document.querySelector('.goog-te-combo').addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        speech.lang = selectedLang;
    });
}
