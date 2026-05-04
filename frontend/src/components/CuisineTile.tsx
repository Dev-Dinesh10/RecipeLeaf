import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';
interface Cuisine {
  id: string;
  label: string;
  emoji: string;
}

interface CuisineTileProps {
  item: Cuisine;
  isSelected: boolean;
  onPress: () => void;
}

const CuisineTile: React.FC<CuisineTileProps> = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tile, isSelected && styles.tileSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={[styles.label, isSelected && styles.labelSelected]} numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1.5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tileSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 2.5,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default CuisineTile;
