import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface MetaBadgeProps {
  icon: string;
  label: string;
  value: string;
}

const MetaBadge: React.FC<MetaBadgeProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginRight: 10,
    minWidth: 80,
    borderColor: colors.border,
    borderWidth: 1,
  },
  icon: {
    fontSize: 18,
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default MetaBadge;
