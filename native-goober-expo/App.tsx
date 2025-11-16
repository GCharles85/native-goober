import { StyleSheet } from 'react-native';
import * as functions from "./api/server"; // TODO REMOVE before deployment
import VerticalImageScroll from './components/VerticalScrollComponent';
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
  return (
    <VerticalImageScroll posts={bills} /> // in prod, this fetches from the backend
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
