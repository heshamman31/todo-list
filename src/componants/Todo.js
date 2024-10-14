import { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../App.js';
// other libraries
import { Grid2 } from "@mui/material";
import { Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// other libraries //
export default function Todo({ todo }) {
    const { todoList, setTodoList } = useContext(TodoContext);
    const [todoupdate, setTodoUpdate] = useState(todo.text)
    
    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todoList")) ?? []);
    }, [setTodoList])
    // useEffect(() => {
    //     localStorage.setItem("todoList", JSON.stringify(todoList));
    // }, [todoList])

    function handelDeleteButtonClick() {
        const updatedTodo = todoList.filter((t) => t.id !== todo.id)
        setTodoList(updatedTodo);
        localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    }
    function handelEditButtonClick() {
        const updatedTodo = todoList.map((t) => t.id === todo.id? {...t, text: todoupdate } : t)
        setTodoList(updatedTodo);
        setEditModalOpen(false);
        localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    }
    function hundleEditInputChange(e) {
        setTodoUpdate(e.target.value)
    }
    // delete modal functionality
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const handelDeleteIconClick = () => {
        setDeleteModalOpen(true);
    };
    
    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };
    // delete modal functionality//
    // edit modal functionality
    
    const [editModalOpen, setEditModalOpen] = useState(false);
    
    const handelEditIconClick = () => {
        setEditModalOpen(true);
    };
    
    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };
    // edit modal functionality//
    
    function handleTodoDone() {
        const updatedTodo = todoList.map((t) => t.id === todo.id ? { ...t, completed: todo.completed = !todo.completed } : t)
        setTodoList(updatedTodo);
        localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    }

    return (
        <Grid2 container sx={{ boxSizing: 'content-box', maxWidth: "100%", color: 'white', bgcolor: "#1c1c27", marginY: '10px', '&:hover': { bgcolor: "#0e0e16" }, transition: '0.3s', textAlign: 'left', alignItems: 'center', padding: '10px', fontSize: "18px", borderRadius: "5px", boxShadow: '1px 3px 1px black', overflow: 'hidden', height: 'fit-content' }}>
            <Grid2 size={8} sx={{ height: '100%', textDecorationLine: todo.completed ? "line-through" : "none" }}>
                {todo.text}
            </Grid2>
            <Grid2 size={4} sx={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton onClick={handleTodoDone} aria-label="check" title="check" size="large" color="info">
                    {todo.completed ? <CheckCircleIcon /> : <TaskAltIcon />}
                </IconButton>
                <IconButton onClick={handelEditIconClick} aria-label="edit" title="edit" size="large" color="info">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handelDeleteIconClick} aria-label="delete" title="delete" size="large" color="error">
                    <DeleteIcon />
                </IconButton>
            </Grid2>
            {/* delete modal */}
            <Dialog
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Removing Todo ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        by deleting the Todo You can't back down
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteModalClose}>close</Button>
                    <Button onClick={handelDeleteButtonClick} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* delete modal //*/}

            {/* edit modal */}
            <Dialog
                open={editModalOpen}
                onClose={handleEditModalClose}
            >
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogContent sx={{width: '400px'}}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="todo-text"
                        label="Todo Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={todoupdate}
                        onChange={hundleEditInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditModalClose}>Cancel</Button>
                    <Button onClick={handelEditButtonClick}>Edit</Button>
                </DialogActions>
            </Dialog>
            {/* edit modal //*/}
        </Grid2>
    );
}