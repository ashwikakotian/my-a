import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class ReadDiaryScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      diaryList: [],
    };
    this.requestRef = null;
  }

  getDiaryList = () => {
    var userId = this.state.userId;
    this.requestRef = db
      .collection('diary')
      .where('user_Id', '==', userId)
      .onSnapshot((snapshot) => {
        var diaryList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          diaryList: diaryList,
        });
        console.log(diaryList);
      });
  };

  componentDidMount() {
    this.getDiaryList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.date}
        titleStyle={{ color: 'EB687B', fontWeight: 'bold', fontSize: 20 }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('DiaryList', {
                details: item,
              });
            }}>
            <Text style={{ color: 'white' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <Header
          backgroundColor={'#EB687B'}
          centerComponent={{
            text: 'Read Dairy',
            style: { color: '#edf6f9', fontSize: 30, fontWeight: 'bold' },
          }}
        />
        <View style={{ flex: 1 }}>
          {this.state.diaryList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Memory Captured</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.diaryList}
              renderItem={this.renderItem}
              style={styles.flat}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FF98A9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    //gradient:
    // marginLeft: RFValue(90),
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flat: { backgroundColor: '#FFD2CF' },
});
