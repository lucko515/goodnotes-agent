from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.openai_service import process_command
from app.services.task_service import process_task
from app.schemas.command import CommandResponse

router = APIRouter()

@router.post("/process", response_model=CommandResponse)
async def process_user_command(
    file: UploadFile = File(...),
    command: str = Form(...),
):
    """
    Process a user command with an uploaded file.
    
    Args:
        file: The uploaded document
        command: Natural language command describing what to do with the document
    
    Returns:
        CommandResponse: Processed result with type and content
    """
    try:
        # Read file content
        content = await file.read()
        
        # Determine command intent using OpenAI
        task_type = await process_command(command)
        
        # Process the task based on intent
        result = await process_task(task_type, content, command)
        
        return CommandResponse(
            type=task_type,
            content=result
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing command: {str(e)}"
        ) 