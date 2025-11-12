import { StyleSheet } from 'react-native';
import VerticalImageScroll from './components/VerticalScrollComponent';

export default function App() {
  const posts = [
    {
      id: '1',
      imageUrl: require('./assets/favicon.png'),
      title: 'Beautiful sunset',
    },
    {
      id: '2',
      imageUrl: require('./assets/goober.jpg'),
      title: 'City lights',
    },
  ];
  return (
    <VerticalImageScroll posts={posts} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
