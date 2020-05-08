import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import axios from 'axios';

import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';

export default class FoodItemScreen extends React.Component {
  static navigationOptions = {
    title: 'All Items',
    headerLeft: () => (
      <MenuImage
        onPress={() => {
          navigation.openDrawer ();
        }}
      />
    ),
  };

  constructor (props) {
    super (props);
    this.state = {
      food_items: [],
      search_copy_food_item: [],
      loading: true,
      search: '',
    };
  }

  componentDidMount () {
    this.getFoodItems ();
  }

  getFoodItems () {
    const thisVar = this;
    axios
      .get (
        'https://www.foodkonnekt.com/admin/getAllItems?merchantUId=c4656bc2-cc41-4486-8d1e-1b4665c57fa7'
      )
      .then (response => {
        const food_items = [];
        response.data.DATA.map (item => {
          const items = {
            ...item,
            wishList: false,
          };
          food_items.push (items);
        });
        thisVar.setState (prevState => ({
          food_items,
          search_copy_food_item: response.data.DATA,
          loading: false,
        }));
      })
      .catch (err => {
        console.log (err);
      });
  }

  updateSearch = search => {
    const {search_copy_food_item} = this.state;
    if (search_copy_food_item.length > 0) {
      let newData = this.state.search_copy_food_item;
      if (search !== '') {
        newData = this.state.search_copy_food_item.filter (function (item) {
          const itemData = item.name
            ? item.name.toUpperCase ()
            : ''.toUpperCase ();
          return itemData.indexOf (search.toUpperCase ()) > -1;
        });
      }
      this.setState ({
        food_items: newData,
        search,
      });
    }
  };

  handleHeartPress (id) {
    console.log ('id: ', id);
    const {food_items} = this.state;
    const temp_food = [];

    food_items.map (item => {
      console.log ('food: ', item.id);
      let food;
      if (item && item.id && parseInt (item.id) === parseInt (id)) {
        if (!item.wishList) {
          food = {
            ...item,
            wishList: true,
          };
        } else {
          food = {
            ...item,
            wishList: false,
          };
        }
      } else {
        food = {
          ...item,
        };
      }
      temp_food.push (food);
    });
    this.setState ({
      food_items: temp_food,
    });
  }

  renderItems = ({item}) => (
    <TouchableHighlight>
      <View style={styles.container}>
        <TouchableOpacity style={styles.heartIcon}>
          <Icon
            raised
            name="heart"
            onPress={() => this.handleHeartPress (item.id)}
            // reverse={!item.wishList ? true : false}
            type="font-awesome"
            color={!item.wishList ? '#cccccc' : 'red'}
          />
        </TouchableOpacity>
        <Image
          style={styles.photo}
          source={require ('../../../assets/all_item_img.png')}
        />
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.add_cart_btn}>
          <Text style={styles.add_cart_btn_text}>Add to Cart </Text>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );

  render () {
    const {food_items, loading, search} = this.state;
    return (
      <View>
        {loading
          ? <ActivityIndicator
              style={styles.horizontal}
              size="large"
              color="#0000ff"
            />
          : <ScrollView>
              <View>
                <SearchBar
                  clearIcon
                  round
                  lightTheme
                  onChangeText={this.updateSearch}
                  placeholder="Search"
                  value={search}
                />
                {food_items.length > 0
                  ? <FlatList
                      vertical
                      showsVerticalScrollIndicator={false}
                      numColumns={2}
                      data={food_items}
                      renderItem={this.renderItems}
                      keyExtractor={item => `${item.id}`}
                    />
                  : <Text style={styles.no_data}> No Data Found!! </Text>}
              </View>

            </ScrollView>}
      </View>
    );
  }
}
