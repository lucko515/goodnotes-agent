import OpenAI from 'openai';
import { toolRegistry } from '../tools/ToolRegistry.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Process a natural language command using OpenAI's function calling
 * @param {string} command User's natural language command
 * @returns {Promise<string>} Processed result
 */
export async function processCommand(command) {
  try {
    // Get all tool schemas
    const toolSchemas = toolRegistry.getOpenAISchemas();

    // Make the OpenAI call
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that helps process documents and commands.'
        },
        {
          role: 'user',
          content: command
        }
      ],
      functions: toolSchemas,
      function_call: 'auto'
    });

    // Get the function call
    const functionCall = response.choices[0].message.function_call;

    if (!functionCall) {
      throw new Error('No function call returned by OpenAI');
    }

    // Get the tool
    const tool = toolRegistry.getTool(functionCall.name);

    // Parse arguments
    const args = JSON.parse(functionCall.arguments);

    // Execute the tool
    const result = await tool.execute(args);

    if (!result.success) {
      throw new Error(result.error || 'Tool execution failed');
    }

    return result.data;

  } catch (error) {
    throw new Error(`Error processing command with OpenAI: ${error.message}`);
  }
}

// TODO: Team needs to implement:
// 1. Tool result post-processing
// 2. Error recovery strategies
// 3. Rate limiting
// 4. Caching
// 5. Monitoring and logging 