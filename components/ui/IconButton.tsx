import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function IconButton({
  name,
  size = 24,
  color = '#000',
  onPress,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
