# backend/src/api/models/response.py
from pydantic import BaseModel

class TranscriptionResponse(BaseModel):
    status: str
    transcription: str

class ErrorResponse(BaseModel):
    detail: str