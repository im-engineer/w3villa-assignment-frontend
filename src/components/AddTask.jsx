import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { addTask } from '../api';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
});

const AddTask = ({ onAdd }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addTask(values);
      toast.success('Task added successfully');
      resetForm();
      if (onAdd) {
        onAdd(response.data);
      }
    } catch (err) {
      toast.error('Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            fullWidth
            margin="normal"
            name="title"
            label="Task Title"
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <Field
            as={TextField}
            fullWidth
            margin="normal"
            name="description"
            label="Description"
            multiline
            rows={3}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ height: 40 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: 'primary.light' }} />
              ) : (
                '+ Add Task'
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask; 