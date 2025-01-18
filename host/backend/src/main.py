# backend/src/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app, Counter, Histogram
import time
from src.config.settings import Settings  # Updated import path
from src.api.routes import transcription  # Updated import path

# Create metrics
REQUESTS = Counter('whosper_requests_total', 'Total ASR requests')
PROCESSING_TIME = Histogram('whosper_processing_seconds', 'Time spent processing audio')

settings = Settings()
app = FastAPI(title=settings.PROJECT_NAME)

# Add prometheus metrics endpoint
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add middleware to track metrics
@app.middleware("http")
async def track_requests(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    
    if request.url.path == "/api/v1/transcribe":
        REQUESTS.inc()
        PROCESSING_TIME.observe(time.time() - start_time)
    
    return response

app.include_router(transcription.router, prefix="/api/v1")