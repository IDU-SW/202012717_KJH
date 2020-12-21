import React, {useState, useRef} from 'react';

function TodoList(prop) {
    function completeTodo(e) {
        console.log(e.target.getAttribute("data"));
        prop.onComplete(e.target.getAttribute("data"));
    }

    function deleteTodo(e) {
        console.log(e.target.getAttribute("data"));
        prop.onDelete(e.target.getAttribute("data"));
    }

    return (
        <div id="note">
        <ul>
        {prop.todos.map( item => (
            <li key={item.id} className={item.doneEn}>
                 {item.text} : {item.done}<button name="btnComplete" data={item.id} onClick={completeTodo}>완료</button><button name="btnDelete" data={item.id} onClick={deleteTodo}>삭제</button>
                 <hr/>
            </li>
            
        ))
        }
        </ul>
        </div>
    )
}

function TodoHeader({todos}) {
    return (        
        <div id="header">
        <h3>Todo App ( {todos.filter( item => 
            item.done == "완료" ).length } / {todos.length})</h3>        
            </div>
    )
}

function NewTodoForm(prop) {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    function addTodo(e) {
        prop.onAdd(text);
        setText("");
    }

    return (
        <div id="footer">
            <input name='newTodo' placeholder='할일을 입력하세요.' onChange={onChange} value={text}/>
            <button onClick={addTodo}>추가</button>
        </div>
    )
}

function App() {    
    let [todos, setTodos] = useState([
    ]);

    
    let nextId = useRef(3);
    
    const onAdd = (textVal) => {
        const todo = {id: nextId.current += 1, text: textVal, done: '미완료', doneEn: 'incomplete'};
        setTodos([...todos, todo]);
    }

    const onDelete = (idVal) => {
        setTodos(todos.filter(todo => todo.id != idVal));
    }

    const onComplete = (idVal) => {
        const modifiedTodos = todos.map(item => item.id == idVal
            ? ({ ...item, id: idVal, text: item.text, done: '완료', doneEn: 'clear'}) // id 가 일치하면 새 객체를 만들어 기존의 내용을 집어넣고, 원하는 값 덮어쓰기
            : item
        );
        console.log("idVal = " + idVal);
        setTodos(modifiedTodos);
    }

    return (
        <div>
            <TodoHeader todos={todos} />
            <div align="center">
                <TodoList todos={todos} onDelete={onDelete} onComplete={onComplete}/>
                <NewTodoForm todos={todos} nextId={nextId} onAdd={onAdd}/>
            </div>
        </div>
    );
}

export default App;
