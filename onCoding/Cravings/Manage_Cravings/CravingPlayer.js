// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';;
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { blockMarginHalf, blockMargin } from '../../ui/common/responsive';

const CravingPlayer = ({videoUrl}) => {
 
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    //setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    // if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
    //   setCurrentTime(data.currentTime);
    // }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => {
    //setPlayerState(PLAYER_STATES.ENDED)
  };

  const onError = () => console.log('Oh! ', error);

  const exitFullScreen = () => {
    console.log('Exit full screen');
  };

  const enterFullScreen = () => { };

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'contain') setScreenType('cover');
    else setScreenType('contain');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <SafeAreaView style={{ flex: 1}}>
      
      <View style={{ flex: 1}}>

      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        fullscreenOrientation={'all'}
        source={{
          uri:
          videoUrl
        }}
        style={styles.mediaPlayer}
        volume={25}
      />

      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#0072BB"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        
      />
      </View>
    </SafeAreaView>
  );
};

CravingPlayer.defaultProps = {
  videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
};
// Component Properties
CravingPlayer.propTypes = {
  videoUrl: PropTypes.string,
}
CravingPlayer.defaultProps = {
  shadow: false
}

export default CravingPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
