# Task Automation Assistant Backend

FastAPI backend for the Task Automation Assistant, providing natural language command processing with OpenAI integration.

## Features

- 🤖 OpenAI-powered command processing
- 📝 Document summarization
- ✅ Task extraction
- 📚 Dictionary lookups
- 📅 Meeting scheduling simulation
- 🔄 Async processing
- 🔒 Error handling and validation

## Quick Start

1. Copy the environment file and set your OpenAI API key:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

2. Build and run with Docker:
```bash
docker build -t task-assistant-backend .
docker run -p 8000:8000 --env-file .env task-assistant-backend
```

The API will be available at http://localhost:8000

## API Endpoints

### POST /api/process
Process a document with a natural language command.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - file: Document file (PDF, TXT, DOC, DOCX)
  - command: Natural language command

**Response:**
```json
{
    "type": "summarize|extract_tasks|lookup|schedule",
    "content": "Processed result"
}
```

## Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn app.main:app --reload
```

## Project Structure

```
backend-python/
├── app/
│   ├── api/
│   │   └── routes.py          # API endpoints
│   │   └── core/
│   │   └── config.py         # Configuration
│   │   └── services/
│   │   └── openai_service.py # OpenAI integration
│   │   └── task_service.py   # Task processing
│   │   └── schemas/
│   │   └── command.py        # Data models
│   └── main.py               # Application entry
├── Dockerfile
├── requirements.txt
└── .env.example
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `API_V1_STR`: API version prefix
- `PROJECT_NAME`: Project name
- `BACKEND_CORS_ORIGINS`: Allowed CORS origins

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types
- Missing or invalid commands
- OpenAI API errors
- Processing failures

## Notes for the Team

1. The backend is designed to be modular and extensible
2. New task types can be added in `task_service.py`
3. OpenAI function calling is used for intent recognition
4. External API integrations are simulated but can be replaced with real APIs
5. All processing is async for better performance

## Next Steps

1. Add real external API integrations
2. Implement caching for API responses
3. Add authentication if needed
4. Add more task types
5. Implement proper logging

Good luck with your project! 🚀 