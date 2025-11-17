import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface StoryThumbnail {
  id: string;
  user: string;
  imageUrl: string;
  hasUnread?: boolean;
}

interface StoryThumbnailsProps {
  stories: StoryThumbnail[];
  onStoryPress: (index: number) => void;
}

export default function StoryThumbnails({ stories, onStoryPress }: StoryThumbnailsProps) {
  const renderStory = ({ item, index }: { item: StoryThumbnail; index: number }) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() => onStoryPress(index)}
    >
      <View
        style={[
          styles.storyBorder,
          item.hasUnread && styles.storyBorderUnread,
        ]}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.storyImage}
        />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.user}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 224, 224, 1)',
  },
  storyBorderUnread: {
    // TODO background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    // For React Native, use a gradient library or solid color:
    backgroundColor: '#e1306c',
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#fff',
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export type { StoryThumbnail };