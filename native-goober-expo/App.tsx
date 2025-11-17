import { View } from 'react-native';
import * as functions from "./api/server"; // TODO REMOVE before deployment
import VerticalImageScroll from './components/VerticalScrollComponent';
// import StoryViewer from './components/StoryViewer'; remove import and file TODO
import StoryThumbnails from './components/StoryThumbnails';
import { useEffect, useState } from 'react';

export default function App() {
  const [bills, setBills] = useState([]);
  // useEffect runs when component loads
  useEffect(() => {
    const loadData = async () => {
      setBills(await functions.getRecentBills());
      console.log(JSON.stringify(bills, null, 2));
    };
    loadData();
  }, []);  // ← Empty array means "run once on mount"
  
  // const posts = [ // todo
  //   {
  //     id: '1',
  //     imageUrl: require('./assets/favicon.png'),
  //     title: 'Beautiful sunset',
  //   },
  //   {
  //     id: '2',
  //     imageUrl: require('./assets/goober.jpg'),
  //     title: 'City lights',
  //   },
  // ];

  const [showStories, setShowStories] = useState(false); // TODO

  const stories = [
    {
      id: '1',
      imageUrl: 'https://picsum.photos/1080/1920?random=1',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '2',
      imageUrl: 'https://picsum.photos/1080/1920?random=2',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/1080/1920?random=3',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '4',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '5',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '6',
      imageUrl: 'https://picsum.photos/1080/1920?random=6',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '7',
      imageUrl: 'https://picsum.photos/1080/1920?random=1',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '8',
      imageUrl: 'https://picsum.photos/1080/1920?random=2',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '9',
      imageUrl: 'https://picsum.photos/1080/1920?random=3',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '10',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '11',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '12',
      imageUrl: 'https://picsum.photos/1080/1920?random=6',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '13',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Senate',
      duration: 5000,
    },
    {
      id: '14',
      imageUrl: 'https://picsum.photos/1080/1920?random=5',
      user: 'Congress',
      duration: 5000,
    },
    {
      id: '15',
      imageUrl: 'https://picsum.photos/1080/1920?random=6',
      user: 'Senate',
      duration: 5000,
    },
  ];
  
  return (
    <View style={{ 
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#fff' 
    }}>
      <StoryThumbnails
        stories={stories}
        onStoryPress={() => setShowStories(true)}
      />  
      <VerticalImageScroll posts={bills} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }); todo
