const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

// POST route to handle prediction requests
router.post('/', (req, res) => {
    // Extract input data from the request body
    const inputData = req.body;

    // Path to the Python script
    const pythonScriptPath = 'predict.py';

    // Command to execute Python script
    const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(inputData)]);

    // Capture output from Python script
    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    // Handle error events
    pythonProcess.stderr.on('data', (data) => {
        console.error("Error running Python script:", data.toString());
        res.status(500).json({ error: 'Internal Server Error' });
    });

    // Handle process exit
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const predictions = JSON.parse(result);
                res.json({ predictions });
            } catch (parseError) {
                console.error("Error parsing Python script result:", parseError);
                res.status(500).json({ error: 'Error parsing Python script result' });
            }
        } else {
            console.error("Python script exited with code", code);
            res.status(500).json({ error: 'Python script exited with non-zero code' });
        }
    });
});

module.exports = router;
