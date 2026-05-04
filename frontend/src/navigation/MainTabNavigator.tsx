import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type MainTabParamList = {
  Dashboard: undefined;
  Generate: undefined;
  Saved: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Dashboard') iconName = 'home';
          else if (route.name === 'Generate') iconName = 'auto-awesome';
          else if (route.name === 'Saved') iconName = 'bookmark';
          else if (route.name === 'Profile') iconName = 'person';

          return (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarLabel: 'HOME' }}
      />
      <Tab.Screen 
        name="Generate" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'GENERATE' }}
      />
      <Tab.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{ tabBarLabel: 'SAVED' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'PROFILE' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 16,
  },
  iconContainerActive: {
    backgroundColor: colors.secondary,
  },
});

export default MainTabNavigator;
