import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import { FlatList } from 'react-native';

import broom from '../assets/icons/broom.png';
import reload from '../assets/icons/refresh-arrow.png';
import close from '../assets/icons/close.png';
import bin from '../assets/icons/bin.png';

const directory = `${FileSystem.documentDirectory}images/`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(directory)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  }
}

const GalleryScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageURIs, setImageURIs] = useState<any[]>([]);

  async function loadImageURIs() {
    try {
      await ensureDirExists();
      const imageFilenames = await FileSystem.readDirectoryAsync(directory);
      const uris = imageFilenames.map(filename => ({
        uri: `${directory}${filename}`,
        name: filename
      }));

      setImageURIs(uris);
    } catch (error) {
      setImageURIs([]);
      console.error('Error loading image URIs:', error);
    }
  }

  useEffect(() => {
    loadImageURIs();
  }, [navigation]);

  const reloadGallery = () => {
    loadImageURIs();
  }

  const resetGallery = async () => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'images');
    loadImageURIs();
  }

  const deleteImage = async (filename: string) => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'images/' + filename)
    loadImageURIs();
    setModalVisible(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FEECDF', padding: 20, paddingVertical: 43 }}>
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40
      }}>
        <Pressable onPress={resetGallery}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#FEFFB8',
            width: 40
          }}>
            <Image
              source={broom}
              resizeMode='contain'
              style={{
                height: 50,
                tintColor: 'white'
              }}
            />
          </View>
        </Pressable>
        <Pressable onPress={reloadGallery}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#FEFFB8',
            width: 40
          }}>
            <Image
              source={reload}
              resizeMode='contain'
              style={{
                height: 40,
                tintColor: 'white'
              }}
            />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={imageURIs}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedImageIndex(index);
              setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: item.uri }}
              onError={(error) => console.error('Image load error:', error)}
              style={{ width: 100, height: 100, margin: 5, backgroundColor: 'white', borderRadius: 15 }}
            />
          </TouchableOpacity>
        )}
      />
      <Modal isVisible={isModalVisible} onSwipeComplete={() => setModalVisible(false)} style={{
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ImageBackground source={{ uri: imageURIs[selectedImageIndex || 0]?.uri }} alt="Img" style={{
          width: 280,
          height: undefined,
          aspectRatio: 3 / 4,
          position: 'relative',
        }}>
          <TouchableOpacity
            onPress={() => deleteImage(imageURIs[selectedImageIndex || 0].name)}
            style={{
              position: 'absolute',
              bottom: -35,
              left: 0,
            }}
          >
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#FEFFB8',
              width: 25
            }}>
              <Image
                source={bin}
                resizeMode='contain'
                style={{
                  height: 25,
                  tintColor: 'white'
                }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#FEFFB8',
            width: 15
          }}>
            <Image
              source={close}
              resizeMode='contain'
              style={{
                height: 15,
                tintColor: 'white'
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default GalleryScreen;
