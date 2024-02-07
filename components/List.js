import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ListItem = ({name, symbol, currentPrice, logoUrl, pricePercentageChange, onPress}) => {
    const priceColor = pricePercentageChange > 0 ? "green" : "red";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: logoUrl,
            }}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.title}>
            ${currentPrice?.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text style={[styles.subTitle, { color: priceColor }]}>
            {pricePercentageChange?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9Abb1",
  },
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
  },
  titleWrapper: {
    marginLeft: 8,
  },
  rightWrapper: {
    alignItems:"flex-end"
  },
});

export default ListItem;
