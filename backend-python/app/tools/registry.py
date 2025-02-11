from typing import Dict, Type, List
from .base import BaseTool
from .summarizer import SummarizerTool
from .task_extractor import TaskExtractorTool
from .semantic_search import SemanticSearchTool

class ToolRegistry:
    """
    Registry for managing all available tools.
    
    TODO: Team needs to implement:
    1. Tool validation
    2. Tool dependencies
    3. Tool versioning
    4. Tool configuration
    5. Tool metrics/logging
    """
    
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}
        self._register_default_tools()
    
    def _register_default_tools(self):
        """Register the default set of tools."""
        default_tools = [
            SummarizerTool(),
            TaskExtractorTool(),
            SemanticSearchTool(),
            # TODO: Add your new tools here
        ]
        
        for tool in default_tools:
            self.register_tool(tool)
    
    def register_tool(self, tool: BaseTool):
        """Register a new tool."""
        if not isinstance(tool, BaseTool):
            raise ValueError("Tool must inherit from BaseTool")
        self._tools[tool.name] = tool
    
    def get_tool(self, name: str) -> BaseTool:
        """Get a tool by name."""
        if name not in self._tools:
            raise KeyError(f"Tool '{name}' not found")
        return self._tools[name]
    
    def get_all_tools(self) -> List[BaseTool]:
        """Get all registered tools."""
        return list(self._tools.values())
    
    def get_openai_schemas(self) -> List[Dict]:
        """Get OpenAI function schemas for all tools."""
        return [tool.function_call_schema for tool in self._tools.values()]

# Global tool registry instance
tool_registry = ToolRegistry() 