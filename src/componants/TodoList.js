// react & components 
import { useState } from 'react';
import Todo from './Todo';
import { useContext } from 'react';
import { TodoContext } from '../App.js';
// react & components //
// other libirarys
import { v7 as uuid } from 'uuid';
import { Button, Divider, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// other libirarys//


export default function TodoList() {
    const [sorting, setSorting] = useState('all');
    const { todoList, setTodoList } = useContext(TodoContext);
    const [inputTitle, setInputTitle] = useState("");
    let todosJsx = todoList.map((t) => {
        switch (sorting) {
            case "completed":
                return t.completed ? <Todo todo={t} key={t.id} /> : null;
            case "notcompleted":
                return !t.completed ? <Todo todo={t} key={t.id} /> : null;
            default:
                return <Todo todo={t} key={t.id} />;
        }
    })
    function handelTextInput(e) {
        setInputTitle(e.target.value)
    }
    function handleAddButtonClick(e) {
        e.preventDefault()
        const updatedTodo = [...todoList, { id: uuid(), text: inputTitle, completed: false }]
        setTodoList(updatedTodo)
        setInputTitle("")
        localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    }
    function hundleSortingChange(e) {
        setSorting(e.target.value)
    }

    return (
        <Container maxWidth="md" sx={{ height: "95vh", bgcolor: '#cfe8fc', borderRadius: 2 }}>
            <h1 style={{ marginTop: "5px", textShadow: "1px 1px 1px black", fontFamily: "Edu AU VIC WA NT Guides, cursive", fontSize: '45px' }}>Todo List</h1>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {/* button group */}
            <ToggleButtonGroup
                size='small'
                value={sorting}
                exclusive
                color='success'
                onChange={hundleSortingChange}
            >
                <ToggleButton value="all" sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Shantell Sans, cursive' }} >
                    all
                </ToggleButton>
                <ToggleButton value="completed" sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Shantell Sans, cursive' }}>
                    completed
                </ToggleButton>
                <ToggleButton value="notcompleted" sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Shantell Sans, cursive' }}>
                    notcompleted
                </ToggleButton>
            </ToggleButtonGroup>
            {/* button group //*/}
            {/* todos*/}
            <Box sx={{ overflow: "auto", height: '66vh', width: '100%' }}>
                {todosJsx}
            </Box>
            {/* todos //*/}
            <form style={{ paddingTop: '8px', display: 'flex' }}>
                <TextField value={inputTitle} onChange={handelTextInput} sx={{ flexGrow: 1 }} id="outlined-basic" label="Task title" variant="outlined" />
                <Button type='submit' disabled={inputTitle.length <= 0} onClick={handleAddButtonClick} sx={{ ml: 1, width: '90px' }} variant="contained">Add</Button>
            </form>

        </Container >
    );
}