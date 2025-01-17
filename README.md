```bash
  pip install git+https://github.com/sudoping01/whosper.git@v1.0.0
```

```python
from whosper import WhosperTranscriber

# Initialize the transcriber
transcriber = WhosperTranscriber(model_id = "sudoping01/whosper-large-v3) 

# Transcribe an audio file
result = transcriber.transcribe_audio("path/to/your/audio.wav")
print(result)
