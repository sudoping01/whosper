```bash
  pip install git+https://github.com/sudoping01/whosper.git
```

```python
from whosper import WhosperTranscriber

# Initialize the transcriber
transcriber = WhosperTranscriber(model_id = "CAYTU/whosper-large-v2") 

# Transcribe an audio file
result = transcriber.transcribe_audio("path/to/your/audio.wav")
print(result)
