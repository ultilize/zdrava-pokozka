import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import close from '../assets/icons/close.png';
import circle from '../assets/icons/circle.png';
import repeat from '../assets/icons/repeat.png';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '../components/Dialog';
import LoadingScreen from '../components/LoadingScreen';

import * as ImageManipulator from 'expo-image-manipulator';
import { cropPicture } from '../helpers/image-helper';
import { convertBase64ToTensor, getModel, startPrediction } from '../helpers/tensor-helper';
import { ToastAndroid } from 'react-native';

import lens from '../assets/icons/lensaa.png';
import Toast from 'react-native-toast-message';

let types = [
  {
    name: "Mole",
    title: "Znamienko",
  },
  {
    name: "Skin Tag",
    title: "Výrastok",
  },
  {
    name: "Hemangiom",
    title: "Hemangiom",
  },
  {
    name: "Wart",
    title: "Bradavica",
  },
  {
    name: "Scar",
    title: "Jazva",
  },
]

function convertToPercentage(prediction: any) {
  if (prediction.length === 0) {
    return "No values provided.";
  }

  // Find the highest number in the array
  const highest = Math.max(...prediction);

  // Calculate the percentage based on the highest value
  const percentage = (highest * 100).toFixed(1);

  return `${percentage}%`;
}

const PhotoReview = ({ image, imageUri, onResetImage, navigation }: any) => {

  const [loading, setLoading] = React.useState(false);

  const processImagePrediction = async (base64Image: any) => {
    const croppedData: any = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);

    console.log(prediction)

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );

    const predictionPercentage = convertToPercentage(prediction);

    const predictionData = {
      ...types[highestPrediction],
      probability: predictionPercentage
    }
    console.log(predictionData);
  };

  const handleImagePrediction = async () => {

    setLoading(true);

    try {
      await processImagePrediction(image);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    if (image && imageUri) {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Ulož čo najbližšie do štvorca, vzdialenosť môže ovplyvniť správny výsledok.',
        visibilityTime: 4000,
      });
    }
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <ImageBackground source={{ uri: imageUri }} style={styles.imageBackground}>
      <Image source={lens} alt="" style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}/>
      <View style={styles.container}>
        {/* <Image source={lens} style={styles.lensImage} /> */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Určite chceš použiť túto fotku?
          </Text>
        </View>
        <Pressable onPress={handleImagePrediction} style={styles.previewButton}>
          <Text style={styles.previewButton.text}>
            Použiť
          </Text>
        </Pressable>
        <Pressable onPress={onResetImage} style={styles.resetButton}>
          <Text style={styles.resetButton.text}>
            Ešte raz
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

const CameraScreen = ({ navigation }: any) => {

  const [loading, setLoading] = React.useState(true);
  const [cameraType, setCameraType] = React.useState(CameraType.back);
  const [photoUri, setPhotoUri] = React.useState<any>(null);
  const [photoRaw, setPhotoRaw] = React.useState<any>(null);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };
  const cameraRef: any = useRef();

  const { cameraStyle, contentStyle } = useFullScreenCameraStyle();

  const flipImageHorizontally = async (imageUri: any) => {
    const { width, height, uri } = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ flip: ImageManipulator.FlipType.Horizontal }]
    );
    return { uri, width, height };
  };

  const resetImage = () => {
    setPhotoRaw(null);
    setPhotoUri(null);
  }

  const handleImageCapture = async () => {
    const imageData = await cameraRef.current.takePictureAsync({
      base64: true,
    });

    if (cameraType === CameraType.front) {
      const flippedImageData = await flipImageHorizontally(imageData.uri);
      setPhotoUri(flippedImageData.uri);
    } else {
      setPhotoUri(imageData.uri);
    }
    setPhotoRaw(imageData);

  };

  const loadCamera = async () => {
    await Camera.requestCameraPermissionsAsync();

    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === 'granted') {
      setLoading(false);
    } else {
      loadCamera();
    }
  }

  React.useEffect(() => {
    loadCamera();
    // setPhotoUri(null);
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Doporučujeme sfotiť čo najbližšie pri obrazovke.',
      visibilityTime: 4000,
    });
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <View style={styles.container}>

      {photoUri && photoRaw ? (
        <PhotoReview image={photoRaw} imageUri={photoUri} onResetImage={resetImage} navigation={navigation} />
      ) : (
        <Camera
          style={[styles.cover, cameraStyle]}
          onCameraReady={() => setLoading(false)}
          onMountError={() => { setLoading(true), console.log('Error loading camera.') }}
          type={cameraType} ref={cameraRef}
          autoFocus={true}
        >
          <View style={[styles.cover, contentStyle]}>


            <View style={[styles.buttonContainer, {
              display: photoUri ? 'none' : 'flex',
            }]}>
              <View style={{
                ...styles.buttonIcon,
                opacity: 0,
              }}>
                <Image
                  source={repeat}
                  resizeMode='contain'
                  style={{
                    ...styles.buttonIcon.icon,
                    tintColor: 'white'
                  }}
                />
              </View>

              <Pressable onPress={() => handleImageCapture()}>
                <View style={{
                  ...styles.buttonIcon,
                }}>
                  <Image
                    source={circle}
                    resizeMode='contain'
                    style={{
                      ...styles.buttonIcon.bigIcon,
                      tintColor: 'white'
                    }}
                  />
                </View>
              </Pressable>

              <Pressable onPress={toggleCameraType}>
                <View style={{
                  ...styles.buttonIcon,
                }}>
                  <Image
                    source={repeat}
                    resizeMode='contain'
                    style={{
                      ...styles.buttonIcon.icon,
                      tintColor: 'white'
                    }}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </Camera>
      )}

    </View>
  );
};

function useFullScreenCameraStyle(ratio = 3 / 4) {
  const window = useWindowDimensions();
  const isPortrait = window.height >= window.width;
  let cameraStyle, contentStyle;

  if (isPortrait) {
    // If the device is in portrait mode, we need to increase the width and move it out of the screen
    const widthByRatio = window.height * ratio;
    const widthOffsetByRatio = -((widthByRatio - window.width) / 2);

    // The camera is scaled up to "cover" the full screen, while maintainin ratio
    cameraStyle = { left: widthOffsetByRatio, right: widthOffsetByRatio };
    // But because the camera is also a wrapping element, we need to reverse this offset to align the content
    contentStyle = { left: -widthOffsetByRatio, right: -widthOffsetByRatio };
  } else {
    // If the device is in landscape mode, we need to increase the height and move it out of the screen
    const heightByRatio = window.width * ratio;
    const heightOffsetByRatio = -((heightByRatio - window.height) / 2);

    // See portrait comments
    cameraStyle = { top: heightOffsetByRatio, bottom: heightOffsetByRatio };
    contentStyle = { top: -heightOffsetByRatio, bottom: -heightOffsetByRatio };
  }

  return { cameraStyle, contentStyle };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark overlay
  },
  lensImage: {
    height: 300,
    width: 300,
    borderRadius: 25,
    overflow: 'hidden',
  },
  textContainer: {
    marginTop: 25,
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  previewButton: {
    padding: 8,
    width: 100,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#8F672C',
    borderRadius: 15,
    text: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'Poppins_600SemiBold',
    }
  },
  resetButton: {
    padding: 8,
    width: 100,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 15,
    text: {
      fontSize: 15,
      color: 'white',
      fontFamily: 'Poppins_500Medium',
    }
  },
  cover: {
    position: "absolute",
    top: 45,
    bottom: 0,
    right: 0,
    left: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    borderTopColor: 'transparent',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FEFFB8',
    smallIcon: {
      width: 20,
      height: 20,
    },
    icon: {
      width: 50,
      height: 50,
    },
    bigIcon: {
      width: 80,
      height: 80
    }
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    borderTopColor: 'transparent',
    backgroundColor: '#B17756',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  previewContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  previewImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
});

export default CameraScreen;
