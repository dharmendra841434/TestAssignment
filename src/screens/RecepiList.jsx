import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BASE_URL} from '../utils/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RecipeScreen = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchRecipes() {
    setLoading(true);
    const ACCESS_TOKEN = await AsyncStorage.getItem('login_token');
    //console.log(ACCESS_TOKEN, 'tjhrj');

    try {
      const response = await axios.get(`${BASE_URL}/recipe/list`, {
        headers: {
          'X-Access-Token': ACCESS_TOKEN,
        },
      });

      console.log('Recipes:', response.data?.data[5]?.recipe_file);
      setRecipeData(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        'Error fetching recipes:',
        error.response ? error.response.data : error.message,
      );
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipeCard = ({item}) => (
    <View style={styles.card}>
      <Image
        defaultSource={{uri: 'https://via.placeholder.com/150/FFC0CB'}}
        source={{
          uri: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/traditional-korean-dish-bibimbap-with-chopsticks-free-photo.jpg?w=2210&quality=70',
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardOverlay}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.cardTitle}>
          {item.recipe_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '99%',
          }}>
          <Text style={styles.cardSubtitle}>{item.recipe_time}</Text>
          <Text style={styles.cardSubtitle}>{item.calories} Kcal</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Text style={styles.favoriteIcon}>🤍</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Recipes</Text>
      {loading ? (
        <>
          <ActivityIndicator
            style={{marginTop: '75%'}}
            size={50}
            color="black"
          />
        </>
      ) : (
        <FlatList
          data={recipeData}
          showsVerticalScrollIndicator={false}
          renderItem={renderRecipeCard}
          keyExtractor={(item, index) => index}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingHorizontal: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardOverlay: {
    position: 'absolute',
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardTitle: {
    fontSize: 13,
    marginBottom: 5,
    color: '#ffff',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#ffff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#FF0000',
  },
});

export default RecipeScreen;
