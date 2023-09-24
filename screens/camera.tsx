import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { CameraFullScreen } from '../lib/cameraFullScreen';

import close from '../assets/icons/close.png';
import circle from '../assets/icons/circle.png';
import repeat from '../assets/icons/repeat.png';

const CameraScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  const [isCameraRunning, setIsCameraRunning] = useState<boolean>(true);
  const [showCameraError, setShowCameraError] = useState<boolean>(false);

  const { cameraStyle, contentStyle } = useFullScreenCameraStyle();

  const handleCameraError = () => {
    setIsCameraRunning(false);
    setShowCameraError(true);
  };

  // Request camera permissions
  const getPermissions = async () => {
    if (!hasPermission) {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  };

  // Toggle between front and back camera
  const toggleCameraType = () => {
    setType(
      type === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

  // Take a photo and display it
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  React.useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>

      {photoUri ? (
        <View style={[styles.cover, styles.previewContainer]}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <Button
            title="Retake Photo"
            onPress={() => setPhotoUri(null)}
          />
        </View>
      ) : (
        <Camera 
          style={[styles.cover, cameraStyle]}
          onCameraReady={() => setIsCameraRunning(true)}
          onMountError={handleCameraError}
          type={type} ref={(ref: any) => (cameraRef.current = ref)}
        >
          <View style={[styles.cover, contentStyle]}>

            <Pressable onPress={() => navigation.navigate('Home')} style={{
              position: 'absolute',
              top: 50,
              right: 25
            }}>
              <View style={{
                ...styles.buttonIcon,
              }}>
                <Image
                  source={close}
                  resizeMode='contain'
                  style={{
                    ...styles.buttonIcon.smallIcon,
                    tintColor: 'white'
                  }}
                />
              </View>
            </Pressable>


            <View style={styles.buttonContainer}>
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

              <Pressable onPress={takePhoto}>
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
      {/* {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <Button
            title="Retake Photo"
            onPress={() => setPhotoUri(null)}
          />
        </View>
      ) : (
        <View style={styles.bottomBar}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      )} */}

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
  },
  cover: {
    position: "absolute",
    top: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
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
