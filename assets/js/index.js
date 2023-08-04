let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i]) = new Option(voice.name, i));
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector('button').addEventListener('click', () => {
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);

    // Create an audio element
    const audio = document.createElement('audio');

    // Listen for the speech to end
    speech.addEventListener('end', () => {
        // Create a blob from the speech synthesis data
        const blob = new Blob([new XMLSerializer().serializeToString(speech)], { type: 'text/xml' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Set the audio source and enable controls
        audio.src = url;
        audio.controls = true;

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'speech.wav'; // Change the file name and extension if desired
        downloadLink.innerText = 'Download Speech';

        // Append the audio and download link to the document body
        document.body.appendChild(audio);
        document.body.appendChild(downloadLink);
    });
});


document.querySelector('.download').addEventListener('click', () => {
    // Perform actions when the "Download" link is clicked
    // For example, you can show a success message or perform additional tasks

    // Optionally, you can remove the download link and audio element from the document
    document.body.removeChild(audio);
    document.body.removeChild(downloadLink);
});