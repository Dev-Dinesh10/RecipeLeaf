import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface ChefTipBoxProps {
  tip: string;
}

const ChefTipBox: React.FC<ChefTipBoxProps> = ({ tip }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💡</Text>
        <Text style={styles.title}>Chef's Tip</Text>
      </View>
      <Text style={styles.tip}>{tip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tipBg,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderColor: colors.border,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  tip: {
    fontSize: 14,
    color: colors.textDark,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

export default ChefTipBox;
