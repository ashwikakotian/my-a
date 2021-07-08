import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import ToDoListScreen from '../screens/ToDoList';
import ReadDiaryScreen from '../screens/ReadDiary';
import WriteDiaryScreen from '../screens/WriteDiary';

export const AppTabNavigator = createBottomTabNavigator({
  ToDoList: { screen: ToDoListScreen },
  ReadDiary: { screen: AppStackNavigator },
  WriteDiary: { screen: WriteDiaryScreen },
});
