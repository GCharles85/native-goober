import { CONFIG } from "../config"

// Fetch recent bills
export const getRecentBills = async () => {
  try {
    const response = await fetch(
      `https://api.congress.gov/v3/bill/118?api_key=${CONFIG.API_KEY}&limit=20`
    );
    const data = await response.json();
    console.log("in server.js"); // todo remove logs
    console.log(JSON.stringify(data.bill, null, 2));
    return data.bills;
  } catch (error) {
    console.error('Error fetching bills:', error);
    return [];
  }
}

// Fetch recent bills
export const getRecentBillsTest = async () => {
  try {
    const response = await fetch(
      `https://api.congress.gov/v3/bill/118?api_key=${CONFIG.API_KEY}&limit=20`
    );
    const data = await response.json(); // SEND ONLY JSON BACK
    return data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    return [];
  }
}

// Fetch specific bill details
export const getBillDetails = async (congress, billType, billNumber) => {
  try {
    const response = await fetch(
      `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}?api_key=${CONFIG.API_KEY}`
    );
    const data = await response.json();
    return data.bill;
  } catch (error) {
    console.error('Error fetching bill details:', error);
    return null;
  }
}

// Search bills by keyword
export const searchBills = async (keyword) => {
  try {
    const response = await fetch(
      `https://api.congress.gov/v3/bill?api_key=${CONFIG.API_KEY}&query=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();
    return data.bills;
  } catch (error) {
    console.error('Error searching bills:', error);
    return [];
  }
}

// // Usage example todo
// async function example() {
//   // Get recent bills
//   const recentBills = await getRecentBills();
//   console.log('Recent bills:', recentBills);

//   // Get specific bill (118th Congress, HR 1)
//   const bill = await getBillDetails(118, 'hr', 1);
//   console.log('Bill details:', bill);

//   // Search for bills about "climate"
//   const climateResults = await searchBills('climate');
//   console.log('Climate bills:', climateResults);
// }

// React Native Component Example
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// interface Bill {
//   number: string;
//   title: string;
//   type: string;
//   congress: number;
// }

// export default function BillsScreen() {
//   const [bills, setBills] = useState<Bill[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   const fetchBills = async () => {
//     try {
//       const data = await getRecentBills();
//       setBills(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Text>Loading bills...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={bills}
//         keyExtractor={(item) => `${item.congress}-${item.type}-${item.number}`}
//         renderItem={({ item }) => (
//           <View style={styles.billItem}>
//             <Text style={styles.billNumber}>
//               {item.type.toUpperCase()} {item.number}
//             </Text>
//             <Text style={styles.billTitle}>{item.title}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   billItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   billNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   billTitle: {
//     fontSize: 14,
//     marginTop: 5,
//     color: '#666',
//   },
// });