import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from 'react-native-elements';
import Tasks from '../components/Tasks';
export default class ToDoListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#1ABC9C'}
          centerComponent={{
            text: 'To Do List',
            style: { color: '#edf6f9', fontSize: 30, fontWeight: 'bold' },
          }}
        />
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Today's Tasks </Text>
        </View>
        <View style={styles.taskView}>
          <Tasks text={'hi'} />
          <Tasks text={'hi'} />
        </View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <TextInput styles={styles.input} placeholder={'Write a task'} />
          <TouchableOpacity>
            <View>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',

    backgroundColor: '#98F0E8',
  },

  textStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingHorizontal: 20,
    //  paddingTop: RFValue(20),
  },
  // textView: { paddingTop: RFValue(20), paddingBottom: RFValue(500) },
  // taskView: { marginTop: 20 },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    backgroundColor: 'black',
    borderWidth: 1,
    width: 250,
  },
});
