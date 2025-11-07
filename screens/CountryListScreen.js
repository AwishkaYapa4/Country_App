import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const CountryListScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,flags,population,languages,currencies'
      );
      const data = res.data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(data);
      setFiltered(data);
    } catch (err) {
      console.error('Fetch error', err);
      alert('Failed to load countries. Check your internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (!text) {
      setFiltered(countries);
      return;
    }
    const lower = text.toLowerCase();
    const filteredList = countries.filter(
      (c) => c.name?.common?.toLowerCase().includes(lower)
    );
    setFiltered(filteredList);
  };

  const renderItem = ({ item }) => {
  const name = item.name?.common ?? '—';
  const flagUri = item.flags?.png || 'https://cdn-icons-png.flaticon.com/512/1975/1975647.png';
  const capital = item.capital ? item.capital[0] : 'N/A';

  return (
    <TouchableOpacity
      key={item.name.common}
      onPress={() => navigation.navigate('Details', { country: item })}
      style={styles.card}
    >
      <View style={styles.flagContainer}>
       <Image 
  source={{ uri: encodeURI(flagUri) }} 
  style={styles.flag} 
  resizeMode="contain"
/>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.capital}>Capital: {capital}</Text>
      </View>
    </TouchableOpacity>
  );
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Search country..."
          placeholderTextColor="#999"
          onChangeText={handleSearch}
          value={query}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name?.common}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginVertical: 4,
  },
  flag: { width: 50, height: 32, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  country: { fontSize: 17, fontWeight: '600', color: '#000' },
  capitalRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  capital: { color: '#555', fontSize: 14 },
  sep: { height: 6 },
});

export default CountryListScreen;
