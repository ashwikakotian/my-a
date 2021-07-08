import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
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
      });
  };

  componentDidMount() {
    this.getDiaryList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title="title"
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('DiaryList', {
                details: item,
              });
            }}>
            <Text style={{ color: 'black' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'#1ABC9C'}
          centerComponent={{
            text: 'Read Dairy',
            style: { color: '#edf6f9', fontSize: 30, fontWeight: 'bold' },
          }}
        />

        <View style={{ flex: 1, backgroundColor: '#98F0E8' }}>
          {this.state.diaryList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                No Memories Captuared
              </Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={this.state.diaryList}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.textb}> DATE: {item.date}</Text>
                    <Text style={styles.textb}> DIARY: {item.diaryText}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('DiaryList', {
                    details: item.data,
                  });
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'bold',
                    fontSize: 20,
                  }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
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
    width: '20%',
    height: '10%',
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
    marginLeft: RFValue(90),
    marginTop: RFValue(200),
  },

  itemContainer: {
    height: 80,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textb: {
    color: 'white',
    fontFamily: 'bold',
    fontSize: 20,
  },
});
