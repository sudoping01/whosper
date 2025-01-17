## Usage

```python
from whisper_asr import WhosperTranscriber

# Initialize the transcriber
transcriber = WhisperTranscriber()

# Transcribe an audio file
result = transcriber.transcribe_audio("path/to/your/audio.wav")
print(result)