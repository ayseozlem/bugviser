import React, { useState } from 'react';
import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPage from './CameraPage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinalPage from './FinalPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="Final" component={FinalPage} /> 
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
          <View style={styles.separator} />
        </View>
        <View style={styles.sicksContainer}>
          <Text style={styles.sectionTitle}>Belirtiler</Text>
          <View style={styles.row}>
            <Sicks sickName="Kaşıntı" />
            <Sicks sickName="Şişlik" />
            <Sicks sickName="Kızarıklık" />
          </View>
          <View style={styles.row}>
            <Sicks sickName="Ağrı" />
            <Sicks sickName="Yanma" />
            <Sicks sickName="Ateş" />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.photoButton}
        onPress={() => navigation.navigate('Camera' as never)}
      >
        <Image source={require('./assets/icons/ico-camera.png')} />
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Sicks = ({ sickName }: { sickName: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState('');

  const handleSelectSeverity = (severity: string) => {
    setSelectedSeverity(severity);
    setShowModal(false);
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
            <TouchableOpacity // Bu kısmı ekledik
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ED8204',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 35, // Mesafeyi azalttık
  },
  logo: {
    width: 268, // Logonun genişliğini ayarladık
    height: 100, // Logonun yüksekliğini ayarladık
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  sicksContainer: {
    marginTop: 80, // Mesafeyi ayarlamak için
    alignItems: 'center', // Değiştirilen stil 
    
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    flex: 1,
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10,
    marginRight: 5,
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
    fontSize: 16,
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
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  option: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  photoButton: {
    width: '70%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  
});
