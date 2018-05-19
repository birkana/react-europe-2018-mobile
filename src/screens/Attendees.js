import React from 'react';
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  LoadingPlaceholder
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { WebBrowser } from 'expo';

import { Colors } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import CachedImage from '../components/CachedImage';
import AttendeeSearch from '../components/AttendeeSearch';

export default class Attendees extends React.Component {
  static navigationOptions = {
    title: 'Attendees',
    headerStyle: { backgroundColor: Colors.blue },
    headerTintColor: 'white',
    headerLeft: <MenuButton />,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    }
  };

  render() {
    return <AttendeeSearch />;
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0
  },
  rowData: {
    flex: 1
  }
});
