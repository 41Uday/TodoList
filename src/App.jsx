import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput('');
  };

  const handleDeleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
    if (editIndex === index) {
      setEditIndex(null);
      setInput('');
    }
  };

  const handleEditTask = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  const addEditBtnStyles = {
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'black',
    '&:hover': {
      borderColor: 'none',
    },
  };

  const deleteBtnStyles = {
    backgroundColor: 'red',
    color: 'white',
    marginLeft: '10px',
  };

  const editBtnStyles = {
    // borderColor: 'blue',
    border: '0.5px solid blue',
    marginLeft: '10px',
  };

  const taskTextStyle = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '60%',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>My To-Do List</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button style={addEditBtnStyles} onClick={handleAddTask}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      {tasks.length === 0 && <p>No Tasks.</p>}
      <ol style={{ padding: 0, width: '500px' }}>
        {tasks?.map((task, index) => (
          <li
            key={index}
            style={{
              marginBottom: '8px',
              width: '100%',
              padding: '15px',
              backgroundColor: 'hsl(0, 0%, 97%)',
              border: '3px solid hsla(0, 0%, 85%, 0.75)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={taskTextStyle} title={task}>
              {task}
            </span>
            <div style={{ width: '38%' }}>
              <button
                onClick={() => handleEditTask(index)}
                style={editBtnStyles}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                style={deleteBtnStyles}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
