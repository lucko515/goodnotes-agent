import express from 'express';
import multer from 'multer';
import { processCommand } from '../services/openaiService.js';

const router = express.Router();
const upload = multer();

/**
 * Process a user command with an uploaded file
 * @route POST /api/process
 * @param {file} file - The uploaded document
 * @param {string} command - Natural language command describing what to do with the document
 * @returns {Object} Processed result with type and content
 */
router.post('/process', upload.single('file'), async (req, res) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    if (!req.body.command) {
      return res.status(400).json({
        error: 'No command provided'
      });
    }

    // Process the command
    const result = await processCommand(req.body.command);

    // Return the result
    return res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error processing command:', error);
    return res.status(500).json({
      error: 'Error processing command',
      details: error.message
    });
  }
});

export default router; 