import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>This is the Other Page!</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home Page')}
      />
    </View>
  );
};

export default ProfileScreen;
