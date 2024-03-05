import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    }));
  };

  return (
    <ImageBackground source={require('./bg.png')} style={styles.background}>
      <View><Text style={styles.heading}>Todo List</Text></View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        
          <TextInput
            style={styles.input}
            placeholder="Add Todo"
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
          />
        </View>
        <Button title="Add" onPress={addTodo} style={styles.addButton} />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.todo}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
              <View style={styles.buttonsContainer}>
                <Button title="Delete" onPress={() => deleteTodo(item.id)} color="#FF3E3E" />
                <Button
                  title={item.completed ? "Undo" : "Complete"}
                  onPress={() => toggleTodo(item.id)}
                  color={item.completed ? "#FFD700" : "#32CD32"}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:"100%",
    height:"100%",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    width: 50,
    marginLeft: 10,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    width: '500px',
    justifyContent: 'space-between', // Add this line
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
export default TodoApp;
