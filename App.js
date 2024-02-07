import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import List from "../cryptotractingapp/components/List";
import { SAMPLE_DATA } from "./assets/data/SampleData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chart from "./components/Chart";
import { getGraphData, getMarketData } from "./services/CryptoService";

export default function App(){
console.log(Math.floor(Date.now() ));
  const [data, setdata] = useState(null);
  useEffect(() =>  {
    const fetchData = async() => {
      const data = await getMarketData();
      setdata(data);
    }
  fetchData();
    
  }, [])

  const [loading, setloading] = useState(false);


  
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  const openModel = async (item) => {
    setloading(true);
    const graph = await getGraphData(item.code);
    console.log(graph);
    setgraph(graph);
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
    setloading(false);
  };

  const [SelectedCoinData, setSelectedCoinData] = useState(null)
  const [graph, setgraph] = useState(null)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle}>Market</Text>
          </View>
          <View style={styles.divider} />

          {data ? (
            <FlatList
              keyExtractor={(item) => item.code}
              data={data}
              renderItem={({ item }) => (
                <List
                  name={item.name}
                  symbol={item.code}
                  currentPrice={item.rate}
                  logoUrl={item.png64}
                  pricePercentageChange={item.delta.week}
                  onPress={() => openModel(item)}
                />
              )}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {SelectedCoinData ? (
            <Chart
              currentPrice={SelectedCoinData.rate}
              logoUrl={SelectedCoinData.png64}
              name={SelectedCoinData.name}
              sparkline={graph}
              pricePercentageChange={SelectedCoinData.delta.week}
              symbol={SelectedCoinData.code}
            />
          ) : (
            <ActivityIndicator size="large" color="#000000" />
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 40,
    marginStart: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    backgroundColor: "#F5F5F7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 100,
  },
});
