import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps {
  onPress: (voteNumber: number) => void;
  voteNumber: number;
  text: string;
}

interface OrganizationScreenProps {
  userPublicKey: Uint8Array;
}

// Renkler
const buttonGradientColors = ['#B470FF', '#6E60FF']; // Açık mor ve mavi tonları
const screenGradientColors = ['#ACE2E1', '#F7EEDD']; // Ekran arka planı renkleri

const CustomButton: React.FC<ButtonProps> = ({ onPress, voteNumber, text }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress(voteNumber);
    navigation.navigate('VotingDetailScreen');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <LinearGradient colors={buttonGradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const OrganizationScreen: React.FC<OrganizationScreenProps> = ({ userPublicKey }) => {
  const handleButtonPress = (voteNumber: number) => {
    console.log('Pressed Vote', voteNumber);
  };

  return (
    <LinearGradient colors={screenGradientColors} style={styles.container}>
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={1}
        text="Vote for Option 1"
      />
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={2}
        text="Vote for Option 2"
      />
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={3}
        text="Vote for Option 3"
      />
      {/* Adding a new button */}
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={4}
        text="Vote for Option 4"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 40,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrganizationScreen;
