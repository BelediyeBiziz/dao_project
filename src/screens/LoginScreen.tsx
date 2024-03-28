import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Linking, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import nacl from 'tweetnacl';
import base58 from 'bs58';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { encode } from 'bs58';
import axios from 'axios';

const Stack = createNativeStackNavigator<RootStackParamList>();


interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

type RootStackParamList = {
  LoginScreen: undefined; // Assuming LoginScreen doesn't expect any parameters
  OrganizationScreen: { userPublicKey: Uint8Array }; // Define parameters expected by OrganizationScreen
  // Define other screens and their parameters here
};


const LoginScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dappKeyPair, setDappKeyPair] = useState<KeyPair | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const generateRandomKeyPair = () => {
      try {
        const newKeyPair: KeyPair = nacl.box.keyPair();
        setDappKeyPair(newKeyPair);
      } catch (error) {
        console.error('Error generating random key pair:', error);
      }
    };

    generateRandomKeyPair();
  }, []);

  const handleConnectPhantom = async () => {
    if (dappKeyPair) {
      const params = new URLSearchParams({
        dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
        cluster: 'mainnet-beta',
        app_url: 'https://phantom.app',
        redirect_link: 'myapp://onConnect',
      });
  
      const connectUrl = `phantom://v1/connect?${params.toString()}`;
  
      try {
        await Linking.openURL(connectUrl);
        setModalVisible(false); // Assuming this sets the visibility of a modal
        await saveWalletPublicKey(dappKeyPair.publicKey);
        // Ensure navigation.navigate is called with parameters that match the expected types
        navigation.navigate("OrganizationScreen", { userPublicKey: dappKeyPair.publicKey });
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    }
  };

  
const saveWalletPublicKey = async (publicKey: Uint8Array) => {
  try {
    // Public key'i base58 ile kodlayıp bir stringe dönüştür
    const publicKeyString = encode(publicKey);

    const response = await axios.get('http://192.168.107.244:3000/getProposal')
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // data: { public_key: publicKeyString }, // Eğer body parametresi gerekiyorsa kullanabilirsiniz
    

  console.log(response.data)
  } catch (error) {
    console.error('Error saving wallet public key:', error);
  }
};


  return (
    <LinearGradient colors={['#ACE2E1', '#F7EEDD']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Image style={styles.daoLogo} source={require('../assets/dao_logo.png')} />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image style={styles.phantomIcon} source={require('../assets/phantom_icon.png')} />
          <Text style={styles.buttonText}>Connect Phantom</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.centeredView}>
              <TouchableOpacity style={styles.exitButton} onPress={() => setModalVisible(false)}>
                <Image source={require('../assets/close.png')} style={styles.exitIcon} />
              </TouchableOpacity>
              <View style={styles.modalView}>
                <Image style={styles.phantomIcon} source={require('../assets/phantom_icon.png')} />
                <Text style={styles.modalHeaderText}>Choose an Option</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    Linking.openURL('https://phantom.app/');
                  }}>
                  <Text style={styles.modalOptionText}>Create a New Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={handleConnectPhantom}>
                  <Text style={styles.modalOptionText}>I Have a Already Wallet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  daoLogo: {
    height: 500,
    width: 500,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A2BE2', // Adjust the color to be more vibrant
    paddingHorizontal: 25, // Sağdan ve soldan boşlukları artırın
    paddingVertical: 15, // Düğme boyutunu biraz küçültün
    borderRadius: 30, // Make the corners rounder
    shadowColor: '#5D3FD3', // Add a shadow to the button as well
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10, // This adds a shadow on Android
  },
  phantomIcon: {
    width: 30, // Make the icon larger
    height: 30, // Keep the aspect ratio
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20, // Make the font slightly smaller
    fontWeight: 'bold',
    marginLeft: 10, // Adjust the spacing
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity for the desired blurring effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
  },
  exitButton: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 1,
  },
  exitIcon: {
    height: 30,
    width: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#27005D',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  modalOption: {
    backgroundColor: '#4D0099',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    fontSize: 25, // Aynı font boyutu
    },
    modalOptionText: {
    fontSize: 20,
    color: '#fff',
    },
    });
    
    export default LoginScreen;