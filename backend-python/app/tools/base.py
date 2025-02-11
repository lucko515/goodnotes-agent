from typing import Any, Dict, Optional
from pydantic import BaseModel

class ToolResponse(BaseModel):
    """Base response model for all tools."""
    success: bool
    data: Any
    error: Optional[str] = None

class BaseTool:
    """Base class for all tools."""
    
    name: str
    description: str
    
    def get_function_schema(self) -> Dict[str, Any]:
        """
        Return the OpenAI function schema for this tool.
        Must be implemented by each tool.
        """
        raise NotImplementedError
    
    async def execute(self, **kwargs) -> ToolResponse:
        """
        Execute the tool's functionality.
        Must be implemented by each tool.
        """
        raise NotImplementedError

    @property
    def function_call_schema(self) -> Dict[str, Any]:
        """Get the complete function call schema for OpenAI."""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": self.get_function_schema()
        } 