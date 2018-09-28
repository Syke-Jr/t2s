// export GOOGLE_APPLICATION_CREDENTIALS=/d/YouTube/t2s/credentials-alpha.json

console.log('howdy do')
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const fs = require('fs');
const path = require('path')
const deepExtend = require('deep-extend')
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
const text = 'Hello, world!';



// Performs the Text-to-Speech request
/* client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  // Write the binary audio content to a local file
  fs.writeFileSync('output.mp3', response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('Audio content written to file: output.mp3');
  });
}); */

const DEFAULT_OPTIONS =  {
  audioConfig: {audioEncoding: 'MP3'},
  voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'}
}

const dialogLines = [
  {
    filename: "test1.mp3",
    options: {
      input: { text: 'Sphnix of black quartz, judge my vow.' },
    }
  },
  {
    filename: "test2.mp3",
    options: {
      input: { text: 'The quick brown fox jumps over the lazy dog.' },
    }
  },
  {
    filename: "test2-adjust.wav",
    options: {
      input: { text: 'The quick brown fox jumps over the lazy dog.' },
      audioConfig: {
        audioEncoding: "LINEAR16",
        pitch: -2.80,
        speakingRate: 1.38
      }
    }
  }
]

function init () {
  dialogLines.forEach((entry, index) => {
    console.log('Processing line', index)
    const options = deepExtend({}, DEFAULT_OPTIONS, entry.options)

    client.synthesizeSpeech(options, (err, response) => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
    
      // Write the binary audio content to a local file
      fs.writeFileSync(path.join(__dirname, 'output', `${entry.filename}`), response.audioContent, 'binary', err => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }
        console.log('Finished line', index)
      });
    });
  })
}

init()