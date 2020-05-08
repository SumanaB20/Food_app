import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import axios from 'axios';

import Salad from '../../../assets/5626.jpg';
import Pastas from '../../../assets/5627.jpg';
import Sandwiches from '../../../assets/5628.jpg';
import GlutenFree from '../../../assets/5631.jpg';
import Desserts from '../../../assets/5633.jpg';
import Sides from '../../../assets/5634.jpg';
import Beverages from '../../../assets/5635.jpg';
import Kids from '../../../assets/5636.jpg';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Categories',
    headerLeft: () => (
      <MenuImage
        onPress={() => {
          navigation.openDrawer ();
        }}
      />
    ),
  });

  constructor (props) {
    super (props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount () {
    this.getCategories ();
  }

  getCategories () {
    const thisVar = this;
    axios
      .get (
        'https://www.foodkonnekt.com/admin/getAllCategories?merchantUId=c4656bc2-cc41-4486-8d1e-1b4665c57fa7'
      )
      .then (response => {
        const categories = [];
        response.data.DATA.map (item => {
          let item_img = Kids;
          console.log (item.name.toUpperCase ().includes ('GLUTEN'));
          if (item.name.toUpperCase ().includes ('SALAD')) {
            item_img = Salad;
          } else if (item.name.toUpperCase ().includes ('PASTAS')) {
            item_img = Pastas;
          } else if (item.name.toUpperCase ().includes ('SANDWICHES')) {
            item_img = Sandwiches;
          } else if (item.name.toUpperCase ().includes ('GLUTEN')) {
            item_img = GlutenFree;
          } else if (item.name.toUpperCase ().includes ('DESSERTS')) {
            item_img = Desserts;
          } else if (item.name.toUpperCase ().includes ('SIDES')) {
            item_img = Sides;
          } else if (item.name.toUpperCase ().includes ('BEVERAGES')) {
            item_img = Beverages;
          } else if (item.name.toUpperCase ().includes ('KIDS')) {
            item_img = Kids;
          }
          const cat = {
            ...item,
            image: item_img,
          };
          categories.push (cat);
        });
        console.log (categories);
        thisVar.setState (prevState => ({
          categories,
          loading: false,
        }));
      })
      .catch (err => {
        console.log (err);
      });
  }

  renderCategory = ({item}) => (
    <TouchableOpacity underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={item.image} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render () {
    const {categories, loading} = this.state;
    return (
      <View style={styles.mainContainer}>
        {loading
          ? <ActivityIndicator
              style={styles.horizontal}
              size="large"
              color="#0000ff"
            />
          : <View>
              {categories.length > 0
                ? <FlatList
                    style={styles.horizontal}
                    data={categories}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                  />
                : <Text style={styles.no_data}> No Data Found!! </Text>}
            </View>}
      </View>
    );
  }
}
