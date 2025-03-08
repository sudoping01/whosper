import torch
from transformers import (
    WhisperForConditionalGeneration,
    WhisperTokenizer,
    WhisperProcessor,
    pipeline
)

class WhosperTranscriber:
    def __init__(self, model_id: str = "CAYTU/whosper-large"):
        """
        Initialize the WhosperTranscriber with a specific model.
        
        Args:
            model_id (str): HuggingFace model identifier
        """
        self.model_id = model_id
        self.torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        self.model = None
        self.tokenizer = None
        self.processor = None
        self.pipe = None
        self.load_model()
        self.configure_pipeline()

    def load_model(self):
        """Load the Whosper model and its components."""
        self.model = WhisperForConditionalGeneration.from_pretrained(
            self.model_id,
            device_map="auto",
            use_cache=True,
            attention_dropout=0.1,
            dropout=0.1
        )

        # Configure model settings
        self.model.config.suppress_tokens = []
        self.model.config.no_repeat_ngram_size = 3
        self.model.config.early_stopping = True
        self.model.config.max_length = 448
        self.model.config.num_beams = 5

        self.tokenizer = WhisperTokenizer.from_pretrained(self.model_id)
        self.processor = WhisperProcessor.from_pretrained(self.model_id)

    def configure_pipeline(self):
        """Configure the ASR pipeline."""
        self.pipe = pipeline(
            "automatic-speech-recognition",
            model=self.model,
            tokenizer=self.tokenizer,
            feature_extractor=self.processor.feature_extractor,
            torch_dtype=self.torch_dtype,
            chunk_length_s=30,
            stride_length_s=3,
            return_timestamps=False,
            batch_size=1
        )

    def transcribe_audio(self, audio_path: str) -> dict:
        """
        Transcribe an audio file.
        
        Args:
            audio_path (str): Path to the audio file
            
        Returns:
            dict: Transcription result
        """
        try:
            result = self.pipe(
                audio_path,
                generate_kwargs={
                    "temperature": 0.0,
                    "do_sample": False,
                    "num_beams": 5,
                    "length_penalty": 1.0,
                    "repetition_penalty": 1.2
                }
            )
            return result
        except Exception as e:
            print(f"Error during transcription: {e}")
            return None
