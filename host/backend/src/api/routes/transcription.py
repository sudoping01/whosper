# backend/src/api/routes/transcription.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from whosper import WhosperTranscriber
from ..models.response import TranscriptionResponse, ErrorResponse
import tempfile
import os

router = APIRouter()
transcriber = WhosperTranscriber()

@router.post("/transcribe", 
    response_model=TranscriptionResponse,
    responses={500: {"model": ErrorResponse}}
)
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Transcribe using Whosper
        result = transcriber.transcribe_audio(tmp_path)
        
        # Cleanup
        os.unlink(tmp_path)

        return TranscriptionResponse(
            status="success",
            transcription=result
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Transcription failed: {str(e)}"
        )