from pydantic import BaseModel

class CommandResponse(BaseModel):
    """Schema for command processing response."""
    type: str
    content: str 