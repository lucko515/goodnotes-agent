import React, { useState, useCallback } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// Get the backend URL from environment variables
// eslint-disable-next-line no-unused-vars
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Allowed file types
const ALLOWED_TYPES = ['application/pdf', 'text/plain', 'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Invalid file type. Please upload a PDF, TXT, or Word document.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File is too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFile = e.dataTransfer.files[0];
      const fileError = validateFile(newFile);
      if (fileError) {
        setError(fileError);
        return;
      }
      setFile(newFile);
      setError(null);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      const fileError = validateFile(newFile);
      if (fileError) {
        setError(fileError);
        return;
      }
      setFile(newFile);
      setError(null);
    }
  };

  const handleClearFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileError = validateFile(file);
    if (fileError) {
      setError(fileError);
      return;
    }
    if (!input.trim()) {
      setError('Please describe what you want to do with the document.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to backend
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('command', input);
      // const response = await fetch(`${BACKEND_URL}/process`, {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // setResult(data);
      
      // Placeholder response for now
      setTimeout(() => {
        setResult({ 
          type: 'summary', 
          content: `Processed ${file ? file.name : 'document'} with instruction: ${input}` 
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to process command. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Task Automation Assistant
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* File Upload Area */}
          <Paper 
            sx={{ 
              p: 2, 
              mb: 3, 
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : 'grey.300',
              bgcolor: dragActive ? 'action.hover' : 'background.paper',
              transition: 'all 0.2s ease',
              position: 'relative',
              outline: 'none'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 3,
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                onChange={handleFileInput}
                style={{ display: 'none' }}
                accept={ALLOWED_TYPES.join(',')}
              />
              <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Drag & Drop your document here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or click to select a file
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: PDF, TXT, DOC, DOCX (Max 10MB)
              </Typography>
              {file && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography variant="body2" color="primary">
                    Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFile(e);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Command Input */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                fullWidth
                label="What would you like to do with this document?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Summarize this document, Extract key points..."
                multiline
                rows={3}
                variant="outlined"
              />
              <Button 
                variant="contained" 
                type="submit"
                disabled={loading}
                size="large"
                endIcon={<SendIcon />}
                sx={{ minWidth: '120px', height: '56px' }}
              >
                Process
              </Button>
            </Stack>
          </Paper>
        </form>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Results Display */}
        {result && !loading && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Result:
            </Typography>
            <Typography variant="body1">
              {result.content}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App; 