import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.leafEmoji}>🌿</Text>
        <Text style={styles.appName}>RecipeLeaf</Text>
        <Text style={styles.tagline}>Your AI Recipe Assistant</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by AI · 100% Delicious</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  leafEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: colors.accent,
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

export default SplashScreen;
