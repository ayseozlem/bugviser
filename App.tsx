import React, { useState } from 'react';
import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPage from './CameraPage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinalPage from './FinalPage';
import { addOrUpdateSymptom } from './firestorehelpers';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraPage} options={{  headerShown: true,
            headerTransparent: true,
            headerTitle: 'Belirti Seç', }}/>
        <Stack.Screen name="Final" component={FinalPage} options={{  headerShown: true,
            headerTransparent: true,
            headerTitle: 'Fotoğraf Çek' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeView = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/icons/logo.png')} style={styles.logo} />
          <View />
        </View>
        <View style={styles.sicksContainer}>
          <Text style={styles.sectionTitle}>Belirtiler</Text>
          <View style={styles.row}>
            <Sicks sickName="Kaşıntı" />
            <Sicks sickName="Şişlik" />
            <Sicks sickName="Kızarıklık" />
          </View>
          <View style={styles.row}>
            <Sicks  sickName="Ağrı" />
            <Sicks sickName="Yanma" />
            <Sicks sickName="Ateş" />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.photoButton}
        onPress={() => navigation.navigate('Camera' as never)}
      >
        <Image source={require('./assets/icons/ico-camera.png')} style={styles.cameraIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Sicks = ({ sickName }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState('');

  const handleSelectSeverity = async (severity: React.SetStateAction<string>) => {
    setSelectedSeverity(severity);
    setShowModal(false);
    await addOrUpdateSymptom(sickName, severity);  // Update Firestore with selected severity
  };

  return (
    <View style={styles.cardContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={styles.modalBackground}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectSeverity('Yok')}
              style={styles.option}
            >
              <Text style={styles.optionText}>Yok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectSeverity('Az')}
              style={styles.option}
            >
              <Text style={styles.optionText}>Az</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectSeverity('Orta')}
              style={styles.option}
            >
              <Text style={styles.optionText}>Orta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectSeverity('Çok')}
              style={styles.option}
            >
              <Text style={styles.optionText}>Çok</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
        style={[
          styles.card,
          selectedSeverity === sickName && { backgroundColor: '#4CAF50' },
        ]}
      >
        <Text style={styles.cardText}>{sickName}</Text>
      </TouchableOpacity>
    </View>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ED8204',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  sicksContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
    overflow: 'hidden',
    
  },
  sectionTitle: {
    color: 'black',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap:3,
  },
  cardContainer: {
    width: '30%',
    marginBottom: height * 0.01,
    aspectRatio: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: width * 0.05,
    borderRadius: 10,
    width: width * 0.8,
  },
  option: {
    marginVertical: height * 0.01,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'black',
  },
  photoButton: {
    width: width * 0.15,
    height: width * 0.15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default App;
