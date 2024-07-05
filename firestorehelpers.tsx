import firestore from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';

// Belirti ve seviyesi ekleme/güncelleme
export const addOrUpdateSymptom = async (name: string | undefined, severity: SetStateAction<string>) => {
  try {
    const symptomRef = firestore().collection('Belirti').doc(name);
    const doc = await symptomRef.get();

    if (doc.exists) {
      await symptomRef.update({ severity });
    } else {
      await symptomRef.set({ name, severity });
    }
    console.log('Belirti eklendi veya guncellendi!');
  } catch (error) {
    console.error('belirti eklemede hata ', error);
  }
};
interface TreatmentMethods {
  resim: string; 
  yontem: string[];
    
  }
  
  export const getTreatmentMethods = async (detectedClass: string | undefined): Promise<TreatmentMethods | null> => {
    if (!detectedClass) {
      return null;
    }
  
    try {
      const doc = await firestore().collection('TreatmentMethods').doc(detectedClass).get();
      if (doc.exists) {
        const data = doc.data();
        if (data) {
          return {
             resim: data.image || '',
            yontem: data.yontem || []          
          };
        }
        
        else {
          console.log('Belge veri içermiyor');
          return null;
        }
      } else {
        console.log('Doküman yok');
        return null;
      }
    } catch (error) {
      console.error('Tedavi yöntemi yok', error);
      return null;
    }
  };