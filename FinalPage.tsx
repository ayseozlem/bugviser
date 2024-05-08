import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

// Belirli bir sınıfa özel tedavi yöntemleri tipi
interface TedaviYontemleri {
  [key: string]: {
    tedaviYontemleri: string[];
    image: string[];
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
      "image": require('./assets/arı.png'),
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
      "image": require('./assets/örümcek.png'),
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.headerCard, isHeaderCentered ? styles.centeredHeader : null]}>
        <View style={styles.detectedClassContainer}>
          <Text style={styles.detected}>Isırık Türü</Text>
          <Text style={styles.detectedClass}>{detectedClass}</Text>
          {!showTreatment && detectedClass !== "Isırık Bulunamadı."  && (
  <TouchableOpacity
    style={styles.button}
    onPress={handleButtonClick}
  >
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#ED8204",
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 16
  },
  centeredHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, // Sayfanın ortasında olması için istediğiniz değeri ayarlayabilirsiniz
  },
  detectedClassContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    paddingLeft: 60,
  },
  detectedClass: {
    fontSize: 24,
    fontWeight: "400",
    color: "black",
    flex: 1,
  },
  detected: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#ED8204',
    borderRadius: 12,
    marginTop: 20,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  tedaviYontemleriCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    margin: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10
  },
  tedaviYontemleriItem: {
    fontSize: 16,
    color: "black",

  },
  noTreatment: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
export default FinalPage;
