import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

// Belirli bir sınıfa özel tedavi yöntemleri tipi
interface TedaviYontemleri {
  [key: string]: {
    tedaviYontemleri: string[];
    image: string;
  };
}

const FinalPage = ({ route }) => {
  const [detectedClass, setDetectedClass] = useState('');
  const [showTreatment, setShowTreatment] = useState(false);
  const [belirlenenTedaviYontemleri, setBelirlenenTedaviYontemleri] = useState<string[]>([]);
  const [isHeaderCentered, setIsHeaderCentered] = useState(true);

  useEffect(() => {
    if (route.params?.detectedClass) {
      setDetectedClass(route.params.detectedClass);
    }
  }, [route.params?.detectedClass]);

  // İlgili sınıfa özel tedavi yöntemleri
  const tedaviYontemleri: TedaviYontemleri = {
    "pire": {
      "tedaviYontemleri": [
        "Isırılan bölgeyi hafifçe yıkayın ve sabunla temizleyin.",
        "Yıkadıktan sonra ılık su ve sabunla temizleyin.",
        "Isırılan bölgeyi kurulayın ve antiseptik bir losyon veya kremle temizleyin.",
        "Kaşıntıyı hafifletmek için antihistaminik bir krem kullanın.",
        "Eğer ciddi bir reaksiyon varsa, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/pire.jpg'),
    },
    "ari": {
      "tedaviYontemleri": [
        "Isırılan bölgeyi soğuk su veya buzla temizleyin.",
        "Arı iğnesini çıkarmak için dikkatlice cımbız kullanın.",
        "Kaşıntıyı hafifletmek için antihistaminik bir krem veya losyon kullanın.",
        "Eğer ciddi bir reaksiyon varsa, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/ari.png'),
    },
    "sinek": {
      "tedaviYontemleri": [
        "Isırılan bölgeyi temizleyin ve antiseptik bir losyon veya kremle temizleyin.",
        "Kaşıntıyı hafifletmek için soğuk kompres uygulayın.",
        "Eğer ciddi bir reaksiyon varsa veya semptomlar devam ederse, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/sivrisinek.png'),
    },
    "tahta-kurusu": {
      "tedaviYontemleri": [
        "Isırık bölgesini yıkayın ve antiseptik bir krem ​​kullanın.",
        "Kaşıntıyı hafifletmek için soğuk kompres uygulayın.",
        "Eğer ciddi bir reaksiyon varsa veya semptomlar devam ederse, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/tahtakurusu.png'),
    },
    "kene": {
      "tedaviYontemleri": [
        "Kene derhal çıkarılmalıdır.",
        "Cımbız veya özel kene çıkarıcı ile deriyi kene başından yakalayın ve yavaşça çekin.",
        "Isırık bölgesini yıkayın ve antiseptik bir krem ​​kullanın.",
        "Eğer ciddi bir reaksiyon varsa veya semptomlar devam ederse, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/kene.png'),
    },
    "orumcek": {
      "tedaviYontemleri": [
        "Isırık bölgesini temizleyin ve antiseptik bir losyon veya kremle temizleyin.",
        "Kaşıntıyı hafifletmek için soğuk kompres uygulayın.",
        "Eğer ciddi bir reaksiyon varsa veya semptomlar devam ederse, bir sağlık uzmanına başvurun."
      ],
      "image": require('./assets/orumcek.png'),
    }
  };

  const handleButtonClick = () => {
    if (!detectedClass) {
      return;
    }
    setShowTreatment(true);
    setBelirlenenTedaviYontemleri(tedaviYontemleri[detectedClass]?.tedaviYontemleri || []);
    setIsHeaderCentered(false);
  };

  const { width, height } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={[styles.container, showTreatment && styles.containerWithTreatment]}>
      <View style={[
        styles.headerCard, 
        isHeaderCentered ? styles.centeredHeader : null, 
        showTreatment ? styles.headerWithTreatment : null
      ]}>
        <View style={styles.detectedClassContainer}>
          <Text style={styles.detected}>Isırık Türü</Text>
          <Text style={styles.detectedClass}>{detectedClass}</Text>
          {!showTreatment && detectedClass !== "Isırık Bulunamadı." && (
            <TouchableOpacity style={styles.button} onPress={handleButtonClick} >
              <Text style={styles.buttonText}>Tedavi Yöntemleri</Text>
            </TouchableOpacity>
          )}
        </View>
        <Image source={tedaviYontemleri[detectedClass]?.image} style={styles.image} />
      </View>
      {showTreatment && detectedClass && (
        <>
          {belirlenenTedaviYontemleri.map((item, index) => (
            <View key={index} style={styles.tedaviYontemleriCard}>
              <Text style={styles.tedaviYontemleriItem}>{item}</Text>
            </View>
          ))}
        </>
      )}
      {!showTreatment && !detectedClass && (
        <Text style={styles.noTreatment}>Isırık bulunamadı.</Text>
      )}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    backgroundColor: "#ED8204",
  },
  containerWithTreatment: {
    paddingTop: height * 0.01, 
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: width * 0.04,
    marginBottom: height * 0.02,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: height * 0.02,
    },
    shadowOpacity: 0.23,
    shadowRadius: height * 0.03,
    elevation: 16
  },
  centeredHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.25,
  },
  headerWithTreatment: {
    marginTop: height * 0.1, 
  },
  detectedClassContainer: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: "black",
    flexDirection: 'column',
    padding: width * 0.02,
    flex: 1,
  },
  detectedClass: {
    fontSize: width * 0.06,
    fontWeight: "400",
    color: "black",
    flex: 1,
  },
  detected: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: "black",
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#ED8204',
    borderRadius: 12,
    marginTop: height * 0.02,
    width: width * 0.4,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  tedaviYontemleriCard: {
    backgroundColor: 'white',
    padding: width * 0.04,
    marginBottom: height * 0.01,
    borderRadius: 10,
    margin: width * 0.04,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: height * 0.01,
    },
    shadowOpacity: 0.21,
    shadowRadius: height * 0.02,
    elevation: 10
  },
  tedaviYontemleriItem: {
    fontSize: width * 0.04,
    color: "black",
  },
  noTreatment: {
    fontSize: width * 0.04,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default FinalPage;
