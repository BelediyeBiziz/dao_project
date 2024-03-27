import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const VotingDetailScreen = () => {
  const [vote, setVote] = useState<boolean | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
  

  const submitVote = (userVote: boolean) => {
    setVote(userVote);
    setVoteSubmitted(true);
    Alert.alert("Vote Received", `You voted: ${userVote ? 'YES' : 'NO'}`);
  };

  return (
    <View style={styles.scrollView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Belediye DAO</Text>
          <Text style={styles.proposalTitle}>Proposal Title</Text>
          <Text style={styles.proposalDescription}>Detailed description of the proposal goes here. Explain the proposal's intent, impact, and any other relevant information that voters need to make an informed decision.</Text>
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
  scrollView: {
    flex: 1,
    backgroundColor: '#ACE2E1', // Set background color directly on the main container
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 40,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  proposalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
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
});

export default VotingDetailScreen;
