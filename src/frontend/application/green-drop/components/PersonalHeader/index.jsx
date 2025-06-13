import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/themes/index';

export default function PersonalHeader({ title, right, showBack = true, style }) {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        {
          backgroundColor: isDark ? colors.dark.background : colors.light.background,
          paddingTop: Platform.OS === 'ios' ? insets.top : 0,
          height: 60 + (Platform.OS === 'ios' ? insets.top : 0),
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.dark.border : colors.light.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        },
        style,
      ]}
    >
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={{ color: isDark ? colors.dark.text : colors.light.text, fontSize: 18 }}>{'<'} Voltar</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 60 }} />
      )}
      <Text style={{ color: isDark ? colors.dark.text : colors.light.text, fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 }} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ width: 60, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}
