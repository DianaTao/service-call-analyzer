import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const AUDIO_FILE_PATH = path.join(__dirname, '../data/audio/39472_N_Darner_Dr_2.m4a');
const OUTPUT_FILE = path.join(__dirname, '../data/transcript.json');

const headers = {
  authorization: ASSEMBLYAI_API_KEY,
  'content-type': 'application/json',
};

async function uploadAudioFile() {
  console.log('📤 Uploading audio file...');
  
  const audioData = fs.readFileSync(AUDIO_FILE_PATH);
  
  const uploadResponse = await axios.post(
    'https://api.assemblyai.com/v2/upload',
    audioData,
    {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/octet-stream',
      },
    }
  );
  
  console.log('✅ Audio file uploaded successfully');
  return uploadResponse.data.upload_url;
}

async function requestTranscription(audioUrl) {
  console.log('🎯 Requesting transcription with speaker diarization...');
  
  const transcriptionRequest = {
    audio_url: audioUrl,
    speaker_labels: true,           // Identify different speakers
    speakers_expected: 2,            // Technician + Customer
    auto_highlights: true,           // Key phrases
    sentiment_analysis: true,        // Sentiment per utterance
    entity_detection: true,          // Detect products, services
    punctuate: true,                 // Add punctuation
    format_text: true,               // Clean formatting
  };
  
  const response = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    transcriptionRequest,
    { headers }
  );
  
  console.log(`✅ Transcription requested. ID: ${response.data.id}`);
  return response.data.id;
}

async function pollTranscription(transcriptId) {
  console.log('⏳ Waiting for transcription to complete...');
  
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
  
  while (true) {
    const response = await axios.get(pollingEndpoint, { headers });
    const status = response.data.status;
    
    if (status === 'completed') {
      console.log('✅ Transcription completed!');
      return response.data;
    } else if (status === 'error') {
      throw new Error(`Transcription failed: ${response.data.error}`);
    }
    
    console.log(`   Status: ${status}... (polling every 5 seconds)`);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

function formatTranscript(transcriptionData) {
  const { utterances, speakers_expected, words, text } = transcriptionData;
  
  // Format utterances for easier consumption
  const formattedUtterances = utterances.map((utterance, index) => {
    const speakerLabel = utterance.speaker === 'A' ? 'Technician' : 'Customer';
    const startTime = formatTimestamp(utterance.start);
    const endTime = formatTimestamp(utterance.end);
    
    return {
      id: index + 1,
      speaker: utterance.speaker,
      speakerLabel: speakerLabel,
      text: utterance.text,
      start: utterance.start,
      end: utterance.end,
      startTime: startTime,
      endTime: endTime,
      confidence: utterance.confidence,
      sentiment: utterance.sentiment || null,
    };
  });
  
  return {
    id: transcriptionData.id,
    fullText: text,
    duration: formatTimestamp(transcriptionData.audio_duration),
    utterances: formattedUtterances,
    speakersDetected: speakers_expected,
    metadata: {
      transcribedAt: new Date().toISOString(),
      audioFile: '39472_N_Darner_Dr_2.m4a',
    },
  };
}

function formatTimestamp(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function main() {
  try {
    console.log('🚀 Starting transcription process...\n');
    
    // Check if API key is set
    if (!ASSEMBLYAI_API_KEY) {
      console.error('❌ Error: ASSEMBLYAI_API_KEY not found in .env file');
      console.log('Please create a .env file in the scripts directory with your API key:');
      console.log('ASSEMBLYAI_API_KEY=your_api_key_here');
      process.exit(1);
    }
    
    // Step 1: Upload audio file
    const audioUrl = await uploadAudioFile();
    
    // Step 2: Request transcription
    const transcriptId = await requestTranscription(audioUrl);
    
    // Step 3: Poll for completion
    const transcriptionData = await pollTranscription(transcriptId);
    
    // Step 4: Format and save
    const formattedTranscript = formatTranscript(transcriptionData);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formattedTranscript, null, 2));
    
    console.log(`\n✅ Transcript saved to: ${OUTPUT_FILE}`);
    console.log(`📊 Total utterances: ${formattedTranscript.utterances.length}`);
    console.log(`⏱️  Duration: ${formattedTranscript.duration}`);
    console.log(`\n🎉 Transcription process completed successfully!`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    process.exit(1);
  }
}

main();

