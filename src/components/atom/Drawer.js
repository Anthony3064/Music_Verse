/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import MIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MCIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Block, Button, Text} from 'expo-ui-kit';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Importar los screens.
import Music_Library from '../../screens/Music_Library';
import Playlists from '../../screens/Playlists';
import Favorites from '../../screens/Favorites';
import Reproductor from '../../scenes/reproductor/index';

//Para poder devolverse o navegar
const Screens = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          ...TransitionPresets.FadeFromBottomAndroid,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <EntypoIcon
                name="menu"
                size={50}
                color="white"
                style={{paddingHorizontal: 10}}
              />
            </Button>
          ),
        }}>
        <Stack.Screen name="Home">
          {(props) => <Music_Library {...props} />}
        </Stack.Screen>
        {/**<Stack.Screen name="Playlists">{props => <Playlists {...props} />}</Stack.Screen>**/}
        <Stack.Screen name="Favorites">
          {(props) => <Favorites {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Reproductor">
          {(props) => <Reproductor {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

//custom Drawer
const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}>
      <Block>
        <Block flex={0.2} margin={20} bottom>
          <Image
            source={require('../../../icons/MusicVerse.png')}
            resizeMode="center"
            style={styles.avatar}
          />
          <Text white title>
            Music Verse
          </Text>
        </Block>
        <Block>
          <DrawerItem
            label="Music Library"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Home')}
            icon={() => (
              <MIcons name="my-library-music" color="white" size={16} />
            )}
          />
          {/**<DrawerItem
              label="Playlists"
              labelStyle={{ color: 'white', marginLeft: -16 }}
              onPress={() => props.navigation.navigate('Playlists')}
              icon={() => <MCIcons name="playlist-music" color="white" size={16} />}
            />**/}
          <DrawerItem
            label="Favorites"
            labelStyle={{color: 'white', marginLeft: -16}}
            onPress={() => props.navigation.navigate('Favorites')}
            icon={() => <MIcons name="favorite" color="white" size={16} />}
          />
        </Block>
      </Block>

      {/* <Block flex={false}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'white' }}
          icon={() => <Icon name="logout" color="white" size={16} />}
          onPress={() => alert('Are your sure to logout?')}
        />
      </Block> */}
    </DrawerContentScrollView>
  );
};
export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <LinearGradient style={{flex: 1}} colors={['#34cfeb', '#b8cfd4']}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide" //asi todo se mueve al lado
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContentOptions={{
          //estilo de los botones
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'white'}} //cambia el color del contenedor de las escenas (el fondo de la animacion)
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {(props) => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    marginLeft: 20,
    height: 60,
    width: 60,
    borderColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
