/**
 * Base response class for all tools
 */
class ToolResponse {
  constructor(success, data, error = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

/**
 * Base class for all tools
 */
class BaseTool {
  constructor() {
    if (this.constructor === BaseTool) {
      throw new Error("Cannot instantiate abstract BaseTool class");
    }
    
    if (!this.name || !this.description) {
      throw new Error("Tool must have name and description");
    }
  }

  /**
   * Get the OpenAI function schema for this tool
   * @returns {Object} Function schema
   */
  getFunctionSchema() {
    throw new Error("getFunctionSchema must be implemented by tool");
  }

  /**
   * Execute the tool's functionality
   * @param {Object} params Tool parameters
   * @returns {Promise<ToolResponse>} Tool execution result
   */
  async execute(params) {
    throw new Error("execute must be implemented by tool");
  }

  /**
   * Get the complete function call schema for OpenAI
   * @returns {Object} Complete function schema
   */
  get functionCallSchema() {
    return {
      name: this.name,
      description: this.description,
      parameters: this.getFunctionSchema()
    };
  }
}

export { BaseTool, ToolResponse }; 