import { BaseTool } from './BaseTool.js';
import { SummarizerTool } from './SummarizerTool.js';
import { TaskExtractorTool } from './TaskExtractorTool.js';
import { SemanticSearchTool } from './SemanticSearchTool.js';

class ToolRegistry {
  constructor() {
    this._tools = new Map();
    this._registerDefaultTools();
  }

  /**
   * Register the default set of tools
   * @private
   */
  _registerDefaultTools() {
    const defaultTools = [
      new SummarizerTool(),
      new TaskExtractorTool(),
      new SemanticSearchTool(),
      // TODO: Add your new tools here
    ];

    for (const tool of defaultTools) {
      this.registerTool(tool);
    }
  }

  /**
   * Register a new tool
   * @param {BaseTool} tool Tool instance to register
   */
  registerTool(tool) {
    if (!(tool instanceof BaseTool)) {
      throw new Error('Tool must inherit from BaseTool');
    }
    this._tools.set(tool.name, tool);
  }

  /**
   * Get a tool by name
   * @param {string} name Tool name
   * @returns {BaseTool} Tool instance
   */
  getTool(name) {
    const tool = this._tools.get(name);
    if (!tool) {
      throw new Error(`Tool '${name}' not found`);
    }
    return tool;
  }

  /**
   * Get all registered tools
   * @returns {BaseTool[]} Array of tool instances
   */
  getAllTools() {
    return Array.from(this._tools.values());
  }

  /**
   * Get OpenAI function schemas for all tools
   * @returns {Object[]} Array of function schemas
   */
  getOpenAISchemas() {
    return this.getAllTools().map(tool => tool.functionCallSchema);
  }
}

// Global tool registry instance
export const toolRegistry = new ToolRegistry(); 