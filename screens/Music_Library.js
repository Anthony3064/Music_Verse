import React from 'react';
import {Block, Text} from 'expo-ui-kit';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

const Music_Library = () => {
  return (
    <LinearGradient
      style={styles.containerView}
      colors={['#34cfeb', '#b8cfd4']}>
      <Block center middle>
        <Text h2>Music Library</Text>
      </Block>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
  },
});

export default Music_Library;
