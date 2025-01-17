```bash
  pip install git+https://github.com/sudoping01/whosper.git@v1.0.0
```

```python
from whisper_asr import WhosperTranscriber

# Initialize the transcriber
transcriber = WhosperTranscriber()

# Transcribe an audio file
result = transcriber.transcribe_audio("path/to/your/audio.wav")
print(result)
