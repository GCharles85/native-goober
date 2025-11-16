import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// Get screen dimensions
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImagePost {
  id: string;
  imageUrl: any;
  title?: string;
  username?: string;
  likes?: number;
}

interface VerticalImageScrollProps {
  posts: ImagePost[];
}

export default function VerticalImageScroll({ posts }: VerticalImageScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Track which post is currently visible
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
    // Add your like logic here
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
    // Add your comment logic here
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // Add your share logic here
  };

  const renderItem = ({ item, index }: { item: ImagePost; index: number }) => {
    const imageSource = typeof item.imageUrl === 'string' 
      ? { uri: item.imageUrl }
      : item.imageUrl;
    return (
      <View style={styles.postContainer}>
        {/* Main Image */}
        <Image
          source={require('../assets/favicon.png')} // todo 
          style={styles.image}
          resizeMode="cover"
        />

        {/* Overlay Content */}
        <View style={styles.overlay}>
          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            {item.username && (
              <Text style={styles.username}>@{item.username}</Text> // todo username?
            )}
            {item.title && (
              <Text style={styles.title}>{item.title}</Text>
            )}
          </View>

          {/* Right Side Buttons (Instagram/TikTok style) */}
          <View style={styles.rightButtons}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleLike(item.id)}
            >
              <Text style={styles.buttonIcon}>♥</Text>
              <Text style={styles.buttonLabel}>
                {item.likes ? `${item.likes}` : 'Like'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleComment(item.id)}
            >
              <Text style={styles.buttonIcon}>💬</Text>
              <Text style={styles.buttonLabel}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleShare(item.id)}
            >
              <Text style={styles.buttonIcon}>↗️</Text>
              <Text style={styles.buttonLabel}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Performance optimizations
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  postContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  bottomInfo: {
    padding: 20,
    paddingBottom: 30,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  rightButtons: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export type { ImagePost };