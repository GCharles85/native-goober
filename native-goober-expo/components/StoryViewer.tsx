import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  StatusBar,
  PanResponder,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Story {
  id: string;
  imageUrl: string;
  duration?: number; // Duration in milliseconds (default 5000)
  user?: string;
}

interface StoryViewerProps {
  stories: Story[];
  onClose: () => void;
  onComplete?: () => void;
}

export default function StoryViewer({ stories, onClose, onComplete }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const currentStory = stories[currentIndex];
  const duration = currentStory?.duration || 5000;

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;

    progress.setValue(0);
    
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        handleNext();
      }
    });

    return () => animation.stop();
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All stories finished
      onComplete?.();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Pan responder for tap gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsPaused(true);
      },
      onPanResponderRelease: (evt, gestureState) => {
        setIsPaused(false);
        
        const { locationX } = evt.nativeEvent;
        const halfScreen = SCREEN_WIDTH / 2;

        if (Math.abs(gestureState.dx) < 10) {
          // Tap gesture (not swipe)
          if (locationX < halfScreen) {
            handlePrevious();
          } else {
            handleNext();
          }
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Story Image */}
      <Image
        source={{ uri: currentStory.imageUrl }}
        style={styles.storyImage}
        resizeMode="cover"
      />

      {/* Touch areas */}
      <View style={styles.touchContainer} {...panResponder.panHandlers}>
        <View style={styles.leftTouchArea} />
        <View style={styles.rightTouchArea} />
      </View>

      {/* Progress bars at top */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width:
                    index < currentIndex
                      ? '100%'
                      : index === currentIndex
                      ? progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        })
                      : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        {currentStory.user && (
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {currentStory.user[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.username}>{currentStory.user}</Text>
          </View>
        )}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Paused indicator */}
      {isPaused && (
        <View style={styles.pausedContainer}>
          <View style={styles.pauseBar} />
          <View style={styles.pauseBar} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  touchContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  leftTouchArea: {
    flex: 1,
  },
  rightTouchArea: {
    flex: 1,
  },
  progressContainer: {
    position: 'absolute',
    top: 40,
    left: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  pausedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -20 }],
    flexDirection: 'row',
    gap: 4,
  },
  pauseBar: {
    width: 4,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
  },
});

export type { Story };