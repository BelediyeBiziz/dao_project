import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';

const Proposal3 = () => {
  const [vote, setVote] = useState<boolean | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
  

  const submitVote = (userVote: boolean) => {
    setVote(userVote);
    setVoteSubmitted(true);
    Alert.alert("Vote Received", `You voted: ${userVote ? 'YES' : 'NO'}`);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/comu_logo.png')} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>Çanakkale Onsekiz Mart Üniversitesi</Text>
          <Text style={styles.proposalTitle}>Spor Tesislerinin Genişletilmesi</Text>
          <Text style={styles.proposalDescription}>Öğrenci bedensel ve zihinsel sağlığının desteklenmesi amacıyla, mevcut spor tesislerimizin genişletilmesi konusunda öğrenci görüşlerini almaya yönelik bir tekliftir. Bu, yeni spor dallarının eklenmesi veya mevcut tesislerin iyileştirilmesi olabilir.</Text>
        </View>
        <View style={styles.voteSection}>
          <View style={{ opacity: voteSubmitted ? 0.5 : 1 }}>
            <TouchableOpacity 
              disabled={voteSubmitted} // Disable button when vote is submitted
              style={[styles.voteButton, styles.yesButton, vote === true ? styles.selected : null]} 
              onPress={() => submitVote(true)}
            >
              <Text style={styles.voteText}>YES</Text>
            </TouchableOpacity>
          </View>
          <View style={{ opacity: voteSubmitted ? 0.5 : 1 }}>
            <TouchableOpacity 
              disabled={voteSubmitted} // Disable button when vote is submitted
              style={[styles.voteButton, styles.noButton, vote === false ? styles.selected : null]} 
              onPress={() => submitVote(false)}
            >
              <Text style={styles.voteText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
        {voteSubmitted && (
          <Text style={styles.voteMessage}>Vote submitted successfully!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACE2E1', // Set background color directly on the main container
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
    color:"black",
    borderBottomWidth:0.5
  },
  proposalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:"center"
  },
  proposalDescription: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  voteSection: {
    flexDirection: 'row',
    justifyContent: 'center', // Align buttons to the center
    width: '100%',
  },
  voteButton: {
    paddingVertical: 16, // Adjusted button height
    paddingHorizontal: 40, // Adjusted button width
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
    overflow: 'hidden',
    marginHorizontal: 8, // Add horizontal margin for spacing between buttons
  },
  selected: {
    borderColor: 'green',
    backgroundColor: '#e8ffe8',
  },
  yesButton: {
    backgroundColor: '#4CAF50', // Green color for YES button
  },
  noButton: {
    backgroundColor: '#F44336', // Red color for NO button
  },
  voteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  voteMessage: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});

export default Proposal3;
