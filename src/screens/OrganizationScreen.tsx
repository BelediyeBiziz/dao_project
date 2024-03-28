import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';
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
    if (voteNumber === 1) {
      navigation.navigate('Proposal1');
    } else if (voteNumber === 2) {
      navigation.navigate('Proposal2');
    } else if (voteNumber === 3) {
      navigation.navigate('Proposal3');
    } else if (voteNumber === 4) {
      navigation.navigate('Proposal4Screen');
    }
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
      <View style={styles.logoContainer}>
        <Image source={require('../assets/comu_logo.png')} style={styles.logo} />
        <Text style={styles.universityText}>Çanakkale Onsekiz Mart Üniversitesi Proposals</Text>
      </View>
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={1}
        text="Yeni Kütüphane Çalışma Alanları Oluşturulması"
      />
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={2}
        text="Kampüs İçi Ulaşım Saatlerinin Yeniden Düzenlenmesi"
      />
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={3}
        text="Spor Tesislerinin Genişletilmesi"
      />
      {/* Adding a new button */}
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={4}
        text="Kampüs Yemekhanelerindeki Denetlemelerin Artması"
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
    width: 350,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
    fontSize: 18,
    textAlign:"center",
    color: 'white',
    fontWeight: 'bold',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  universityText: {
    fontSize: 24,
    color: 'black',
    textAlign:"center",
    fontWeight: 'bold',
    marginHorizontal:10
  },
});

export default OrganizationScreen;
