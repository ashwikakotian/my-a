import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class DiaryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,

      date: this.props.navigation.getParam('details')['date'],

      diaryText: this.props.navigation.getParam('details')['diaryText'],
      allDiary:[]
    };
  }

  retrieveDiaries=()=>{
    try {
      var allDiary= []
      var stories = db.collection("diary")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allDiary.push(doc.data())
              console.log('this are the stories',allDiary)
          })
          this.setState({allDiary})
        })
    }
    catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    //this.retrieveDiaries()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'Read Diary',
              style: {
                color: '#ffffff',
                fontSize: RFValue(20),
                fontWeight: 'bold',
              },
            }}
            backgroundColor="#32867d"
          />
        </View>
         <Text style={styles.textInputText}>DATE</Text>
        <TextInput
         
         
          style={styles.date}
          value={this.state.date}
        />
        <Text style={styles.textInputText}>HOW WAS YOUR DAY ?</Text>
        <TextInput
          //placeholder="How Was Your Day ?"
          
          value={this.state.diaryText}
          style={styles.diary}
          multiline={true}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(60),
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  date: {
    height: 50,
    borderBottomWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D3B78E',
    borderTopWidth: 0.5,
     fontSize: 25,
    color:"#800000"
  },
  diary: {
    height: 250,
    borderBottomWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D3B78E',
    borderTopWidth: 0.5,
    fontSize: 25,
    color:"#800000"
  },
  textInputText: {
    color: '#EC275F',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 45,
    marginTop: 20,
    marginBottom: -20,
    fontFamily: 'comic',
  },
});

  // <View style={{ flex: 0.9 }}>
        //   <View
        //     style={{
        //       flex: 0.6,
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //     }}>
        //     <Text
        //       style={{
          //       fontWeight: '500',
          //       fontSize: RFValue(25),
          //       textAlign: 'center',
          //     }}>
          //     {this.state.date}
          //   </Text>
          //   <Text
          //     style={{
          //       fontWeight: '400',
          //       fontSize: RFValue(15),
          //       textAlign: 'center',
          //       marginTop: RFValue(15),
          //     }}>
          //     {this.state.diaryText}
          //   </Text>
          // </View>
        // </View>
