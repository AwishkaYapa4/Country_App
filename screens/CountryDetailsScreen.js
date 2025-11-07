import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CountryDetailsScreen = ({ route }) => {
  const { country } = route.params;
  if (!country) return null;

  const name = country.name?.common ?? '—';
  const official = country.name?.official ?? '';
  const flagUri = country.flags?.png;
  const capital = country.capital ? country.capital.join(', ') : 'N/A';
  const region = country.region ?? 'N/A';
  const subregion = country.subregion ?? 'N/A';
  const population = country.population
    ? country.population.toLocaleString()
    : 'N/A';
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol || ''})`)
        .join(', ')
    : 'N/A';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {flagUri && <Image source={{ uri: flagUri }} style={styles.flag} />}

        <Text style={styles.title}>{name}</Text>
        {official && <Text style={styles.subtitle}>{official}</Text>}

        <View style={styles.row}>
          <Ionicons name="business-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Capital: </Text>
          <Text style={styles.value}>{capital}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="globe-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Region: </Text>
          <Text style={styles.value}>{region}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="map-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Subregion: </Text>
          <Text style={styles.value}>{subregion}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="people-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Population: </Text>
          <Text style={styles.value}>{population}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="language-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Languages: </Text>
          <Text style={styles.value}>{languages}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash-outline" size={18} color="#007bff" />
          <Text style={styles.label}> Currencies: </Text>
          <Text style={styles.value}>{currencies}</Text>
        </View>

        {country.maps?.googleMaps && (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(country.maps.googleMaps)}
          >
            🌍 Open in Google Maps
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  flag: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  label: { fontWeight: '600', color: '#000' },
  value: { flexShrink: 1, color: '#444' },
  link: {
    color: '#007bff',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default CountryDetailsScreen;
