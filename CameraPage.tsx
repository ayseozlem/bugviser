// CameraPage.js

import React, { useRef } from 'react';
import { Button, View, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const CameraPage = ({ navigation }) => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const imageBase64 = data.base64;

        const response = await axios({
          method: 'POST',
          url: "https://detect.roboflow.com/bug-bites/1?",
          params: {
            api_key: 'kiY50ly5PRvXN0xh7D67',
          },
          data: imageBase64,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        
        if (response.data && response.data.predictions && response.data.predictions.length > 0) {
          const detectedClass = response.data.predictions[0].class;
          navigation.navigate('Final', { detectedClass });
        } else {
          navigation.navigate('Final', { detectedClass: "Tahminler bulunamadı" });
        }
      } catch (error) {
        console.error('Error sending photo:', error);
        Alert.alert('Error', 'Failed to send photo');
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Kamera izni',
          message: 'Kamerayı kullanmak için izin vermeniz gerekiyor',
          buttonPositive: 'Tamam',
          buttonNegative: 'İptal',
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title={'Fotoğraf Çek'} onPress={takePicture} color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
});

export default CameraPage;
  