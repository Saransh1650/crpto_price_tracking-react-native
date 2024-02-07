import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  pricePercentageChange,
  sparkline,
  symbol,
}) => {
  const priceColor = pricePercentageChange > 0 ? "green" : "red";
  if (sparkline.length === 0) {
    return <Text>Loading...</Text>;
  }
  const [xaxis, setx] = useState(null);
  const [yaxis, sety] = useState(null);
  const data = [{ x: xaxis, y: yaxis }];
  const [rate, setrate] = useState(currentPrice);
  const [loading, setloading] = useState(false);
  const Points = async ({ x, y }) => {
    setloading(true);
    setx(x);
    sety(y);
    setrate(y?.toFixed(2));
    setloading(false);
  };

  console.log(rate);
  console.log(yaxis);
  return (
    <View style={styles.chartWrapper}>
      <View styles={styles.titleWrapper}>
        <View style={styles.upperTitles}>
          <View style={styles.upperLeftTitle}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subTitle}>
              {name} ({symbol?.toUpperCase()})
            </Text>
          </View>
          <Text style={styles.subTitle}>7d</Text>
        </View>
        <View style={styles.lowerTitle}>
          <Text style={styles.boldTitle}>
            {rate ? (
              `${rate?.toLocaleString("en-US", { currency: "USD" })}`
            ) : (
              <ActivityIndicator />
            )}
          </Text>
          <Text style={[styles.title, { color: priceColor }]}>
            {pricePercentageChange?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.chart}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <VictoryChart
          width={450}
          containerComponent={
            <VictoryVoronoiContainer
              style={{
                parent: { border: "1px solid #ccc" },

                labels: {
                  fontSize: 40,
                },
              }}
              labels={({ datum }) => 
                `$${datum.rate.toFixed(2)} `
              }
              labelComponent={
                <VictoryTooltip
                  style={{ fill: "black", fontWeight:"bold" }}
                  flyoutStyle={{ stroke: "black", strokeWidth: 1 }}

                  center={{ y: 100 }}
                  pointerOrientation="bottom"
                  flyoutWidth={150}
                  flyoutHeight={50}
                  pointerWidth={15}
                  cornerRadius={10}
                />
              }
              cursor="pointer"
            />
          }
          theme={VictoryTheme.material}
        >
          <VictoryLine
            data={sparkline.history}
            x="date"
            y="rate"
            interpolation="catmullRom"
            animate={{
              duration: 4000,
              onLoad: { duration: 4000 },
            }}
          />
          {xaxis !== null && (
            <>
              <VictoryScatter
                data={data}
                size={5}
                style={{
                  data: {
                    fill: "red",
                  },
                }}
              />
            </>
          )}

          <VictoryAxis
            dependentAxis
            style={{ axis: { stroke: "none" } }}
            tickFormat={() => ""}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    flex: 1,

    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  chartWrapper: {
    margin: 12,
  },
  titleWrapper: {
    marginTop: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
});
