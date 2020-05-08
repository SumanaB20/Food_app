import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render () {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="CATEGORIES"
            style={styles.menuBtn}
            source={require ('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate ('Categories');
              navigation.closeDrawer ();
            }}
          />
          <MenuButton
            title="ALL ITEMS"
            source={require ('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate ('FoodItem');
              navigation.closeDrawer ();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape ({
    navigate: PropTypes.func.isRequired,
  }),
};
