import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Belirli bir sınıfa özel tedavi yöntemleri tipi
interface TedaviYontemleri {
  [key: string]: {
    tedaviYontemleri: string[];
  };
}

const FinalPage = ({ route }) => {
  const [detectedClass, setDetectedClass] = useState('');

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
        "Kaşıntıyı hafifletmek için antihistaminik bir krem ​​kullanın.",
        "Eğer ciddi bir reaksiyon varsa, bir sağlık uzmanına başvurun."
      ]
    },
    "ari": {
      "tedaviYontemleri": [
        "Isırılan bölgeyi soğuk su veya buzla temizleyin.",
        "Arı iğnesini çıkarmak için dikkatlice cımbız kullanın.",
        "Kaşıntıyı hafifletmek için antihistaminik bir krem veya losyon kullanın.",
        "Eğer ciddi bir reaksiyon varsa, bir sağlık uzmanına başvurun."
      ]
      
    }
    // Diğer sınıfların tedavi yöntemleri buraya eklenebilir
  };

  // Belirlenen sınıfa ait tedavi yöntemlerini al
  const belirlenenTedaviYontemleri = detectedClass ? tedaviYontemleri[detectedClass]?.tedaviYontemleri : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.detectedClass}>{detectedClass}</Text>
      </View>
      {belirlenenTedaviYontemleri && belirlenenTedaviYontemleri.length > 0 ? (
        <View style={styles.tedaviYontemleriContainer}>
          {belirlenenTedaviYontemleri.map((item, index) => (
            <View key={index} style={styles.tedaviYontemleriCard}>
              <Text>Tedavi yöntemleri</Text>
              <Text style={styles.tedaviYontemleriItem}>{item}</Text>
            </View>
          ))}
        </View>
      ) : (
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
  },
  headerCard: {
    backgroundColor: 'gray',
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  detectedClass: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tedaviYontemleriContainer: {
    marginBottom: 20,
  },
  tedaviYontemleriCard: {
    backgroundColor: 'green',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  tedaviYontemleriItem: {
    fontSize: 16,
  },
  noTreatment: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default FinalPage;
