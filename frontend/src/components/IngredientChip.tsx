import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface IngredientChipProps {
  label: string;
  onRemove: () => void;
}

const IngredientChip: React.FC<IngredientChipProps> = ({ label, onRemove }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        activeOpacity={0.75}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      >
        <Text style={styles.removeIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.chipBg,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
  },
  removeButton: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default IngredientChip;
