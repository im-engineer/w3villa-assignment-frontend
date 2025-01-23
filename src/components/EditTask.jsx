import React, { useState } from 'react';
import { updateTask } from '../api';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const EditTask = ({ task, setTasks, setEditingTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTask(task._id, { title, description, completed });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? res.data : t))
      );
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
          size="small"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          size="small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Mark as completed"
          sx={{ my: 1 }}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Save
          </Button>
          <Button
            onClick={() => setEditingTask(null)}
            variant="outlined"
            startIcon={<CancelIcon />}
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTask; 