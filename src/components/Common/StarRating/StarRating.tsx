import React from 'react';
import {View, StyleSheet} from 'react-native';
import Stars from '@assets/images/starSvg.svg';

type Props = {
  rating: number;
};

const StarRating = ({rating}: Props) => {
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round rating to the nearest half
    for (let i = 1; i <= 5; i++) {
      let starIconName = 'star-o'; // By default, show empty star
      if (i <= roundedRating) {
        starIconName = 'star'; // Fill the star if i is less than or equal to roundedRating
      } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
        starIconName = 'star-half-o'; // Show half-filled star if roundedRating is not an integer
      }
      stars.push(
        <Stars width={20} height={20} style={{marginHorizontal: 5}} />,
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
