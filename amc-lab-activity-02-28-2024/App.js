import React, { useState } from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim().length === 0) {
      return;
    }

    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        id: Math.random().toString(),
        value: enteredGoalText,
        color: randomColor,
      },
    ]);
    setEnteredGoalText('');
  };

  const resetHandler = () => {
    setEnteredGoalText('');
    setCourseGoals([]);
  };

  const renderGoalItem = ({ item }) => (
    <View style={[styles.goalsContainer, { backgroundColor: item.color }]}>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Goals:</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal here"
          placeholderTextColor="gray"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button
          title="Add Goal"
          onPress={addGoalHandler}
          accessibilityLabel="Add goal"
        />
        <Button
          title="Reset"
          onPress={resetHandler}
          color="red"
          accessibilityLabel="Reset input"
        />
      </View>
      <FlatList
        data={courseGoals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Times New Roman',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 0,
  },
});
