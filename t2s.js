const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

const client = new textToSpeech.TextToSpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

const text = 'Since she was little, Twilight had heard stories of Darklight Star, the traitor who had gone mad and attempted to steal the Elements of Harmony and all Equestria from the Princesses. She’d never quite known why, but she found them fascinating. Now, having finished what was likely to be the most historically accurate accounting of the event available to her, Twilight found herself wondering where the legend came from. All legends had a grain of truth hidden within them somewhere. The Elements of Harmony. The truth was there somewhere, Twilight decided. She’d read about them somewhere before; she just needed to find it again.';
const outputFile = 'D:\YouTube\t2s_test1.mp3';

const request = {
  audioConfig: {audioEncoding: 'LINEAR16', pitch: '-2.80', speakingRate: '1.38'}
  input: {text: text},
  voice: {languageCode: 'en-GB', name: 'en-GB-Wavenet-D'},
  audioConfig: {audioEncoding: 'MP3'},
};

client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  fs.writeFile(outputFile, response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log(`Audio content written to file: ${outputFile}`);
  });
});