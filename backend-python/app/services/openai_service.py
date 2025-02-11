from typing import Dict, Any, List
import openai
import json
from app.core.config import settings
from app.tools.registry import tool_registry
from app.tools.base import ToolResponse

async def process_command(command: str) -> str:
    """
    Process a natural language command using OpenAI's function calling.
    
    Args:
        command: The user's natural language command
    
    Returns:
        str: The determined task type
    """
    try:
        # Get all tool schemas
        tool_schemas = tool_registry.get_openai_schemas()
        
        # Make the OpenAI call
        response = await openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI assistant that helps process documents and commands."},
                {"role": "user", "content": command}
            ],
            functions=tool_schemas,
            function_call="auto"
        )
        
        # Get the function call
        function_call = response.choices[0].message.function_call
        
        if not function_call:
            raise ValueError("No function call returned by OpenAI")
        
        # Get the tool
        tool = tool_registry.get_tool(function_call.name)
        
        # Parse arguments
        arguments = json.loads(function_call.arguments)
        
        # Execute the tool
        result = await tool.execute(**arguments)
        
        if not result.success:
            raise ValueError(result.error or "Tool execution failed")
        
        return result.data
        
    except Exception as e:
        raise Exception(f"Error processing command with OpenAI: {str(e)}")

# TODO: Team needs to implement:
# 1. Tool result post-processing
# 2. Error recovery strategies
# 3. Rate limiting
# 4. Caching
# 5. Monitoring and logging 