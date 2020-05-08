import {StyleSheet} from 'react-native';
import {FoodCard} from '../../AppStyles';

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: FoodCard.container,
  photo: FoodCard.photo,
  title: FoodCard.title,
  price: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  add_cart_btn: {
    marginTop: 5,
    backgroundColor: '#4da6ff',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  add_cart_btn_text: {
    color: 'white',
    textAlign: 'center',
  },
  no_data: FoodCard.no_data,
});

export default styles;
