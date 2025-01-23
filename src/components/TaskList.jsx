import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { updateTask, deleteTask } from '../api';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description || '',
      completed: task.completed || false,
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setLoading(false);
    setEditDialogOpen(false);
    setEditingTask(null);
    setEditFormData({
      title: '',
      description: '',
      completed: false,
    });
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      await updateTask(editingTask._id, editFormData);
      toast.success('Task updated successfully');
      onUpdate();
      handleEditClose();
    } catch (err) {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteTask(taskToDelete._id);
      toast.success('Task deleted successfully');
      onDelete();
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to delete task');
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setLoading(false);
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  if (!tasks.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks found. Add your first task!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary',
                  }}
                >
                  {task.title}
                </Typography>
              }
              secondary={task.description}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Edit Task">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(task)}
                  sx={{
                    mr: 1,
                    color: 'primary.main',
                    '&:hover': {
                      color: 'primary.dark',
                      bgcolor: 'primary.lighter',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(task)}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      color: 'error.dark',
                      bgcolor: 'error.lighter',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editFormData.title}
            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={editFormData.description}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editFormData.completed}
                onChange={(e) => setEditFormData({ ...editFormData, completed: e.target.checked })}
                color="primary"
              />
            }
            label="Completed"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Task
        </DialogTitle>
        <DialogContent id="delete-dialog-description">
          <Typography>
            Are you sure you want to delete this task?
            {taskToDelete && (
              <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                "{taskToDelete.title}"
              </Typography>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList; 