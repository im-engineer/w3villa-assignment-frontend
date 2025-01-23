import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTasks } from "../api";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import {
    Container,
    Stack,
    Paper,
    Typography,
    Pagination,
    Box,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from "@mui/material";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiLoading, setApiLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async (pageNum = 1) => {
        try {
            setApiLoading(true);
            const res = await getTasks(pageNum);
            setTasks(res.data.tasks);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
        } catch (err) {
            setError(err.message);
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
            setApiLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchTasks(value);
    };

    const handleAddTask = async (newTask) => {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        if (tasks.length >= 10) {
            await fetchTasks(currentPage + 1);
        }
    };

    const handleUpdateTask = async () => {
        await fetchTasks(currentPage);
    };

    const handleDeleteTask = async () => {
        await fetchTasks(currentPage);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    zIndex: 1000,
                }}
            >
                <CircularProgress size={48} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ position: "relative", py: 4 }}>
                {apiLoading && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            zIndex: 1000,
                        }}
                    >
                        <CircularProgress size={48} thickness={4} />
                    </Box>
                )}

                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ 
                        mb: 4,
                        fontSize: isMobile ? '1.75rem' : '2.125rem'
                    }}
                >
                    Task Dashboard
                </Typography>

                <Stack 
                    spacing={4} 
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ width: '100%' }}
                >
                    <Box 
                        sx={{ 
                            p: 2,
                            width: { xs: '100%', sm: 'auto' },
                            backgroundColor: 'white',
                            height: '10%',
                            borderRadius: '10px',
                        }}

                    >
                        <AddTask onAdd={handleAddTask} />
                    </Box>
                    <Stack width="100%">
                        <Paper sx={{ p: 2 }}>
                            <TaskList
                                tasks={tasks}
                                onUpdate={handleUpdateTask}
                                onDelete={handleDeleteTask}
                                setEditingTask={setEditingTask}
                            />
                            {(totalPages > 1 || tasks.length >= 10) && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 4,
                                        '& .MuiPagination-ul': {
                                            flexWrap: 'nowrap'
                                        }
                                    }}
                                >
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size={isMobile ? "medium" : "large"}
                                    />
                                </Box>
                            )}
                        </Paper>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    );
};

export default Dashboard;
