import ButtonBack from "@/components/shared/ButtonBack";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const Stats = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Global scores</Text>
            <View style={{ height: 8 }} />
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Max points:</Text>
              <Text style={styles.statsDinamicText}> [3.490] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total games:</Text>
              <Text style={styles.statsDinamicText}> [20] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Perfect games:</Text>
              <Text style={styles.statsDinamicText}> [50] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Good games:</Text>
              <Text style={styles.statsDinamicText}> [30] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Complete games:</Text>
              <Text style={styles.statsDinamicText}> [90] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total time played:</Text>
              <Text style={styles.statsDinamicText}> [330.456] hs </Text>
            </View>
          </View>
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Scores by level</Text>
            <View style={{ height: 8 }} />
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Level:</Text>
              <Text style={styles.statsDinamicText}> [Easy] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Max points:</Text>
              <Text style={styles.statsDinamicText}> [1.254] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total games:</Text>
              <Text style={styles.statsDinamicText}> [20] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Best time:</Text>
              <Text style={styles.statsDinamicText}> [04.57] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Streak:</Text>
              <Text style={styles.statsDinamicText}> [10] </Text>
            </View>
            <View style={{ height: 8 }} />
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Level:</Text>
              <Text style={styles.statsDinamicText}> [Medium] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Max points:</Text>
              <Text style={styles.statsDinamicText}> [1.254] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total games:</Text>
              <Text style={styles.statsDinamicText}> [20] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Best time:</Text>
              <Text style={styles.statsDinamicText}> [04.57] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Streak:</Text>
              <Text style={styles.statsDinamicText}> [10] </Text>
            </View>
            <View style={{ height: 8 }} />
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Level:</Text>
              <Text style={styles.statsDinamicText}> [Hard] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Max points:</Text>
              <Text style={styles.statsDinamicText}> [1.254] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total games:</Text>
              <Text style={styles.statsDinamicText}> [20] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Best time:</Text>
              <Text style={styles.statsDinamicText}> [04.57] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Streak:</Text>
              <Text style={styles.statsDinamicText}> [10] </Text>
            </View>
            <View style={{ height: 8 }} />
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Level:</Text>
              <Text style={styles.statsDinamicText}> [Expert] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Max points:</Text>
              <Text style={styles.statsDinamicText}> [1.254] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Total games:</Text>
              <Text style={styles.statsDinamicText}> [20] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Best time:</Text>
              <Text style={styles.statsDinamicText}> [04.57] </Text>
            </View>
            <View style={styles.statsLine}>
              <Text style={styles.statsText}>Streak:</Text>
              <Text style={styles.statsDinamicText}> [10] </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* 

  level: number;
  name: string;
  maxPoints: number;
  totalGames: number;
  besttime: number;
  streak: number;

*/

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  statsContainer: {
    backgroundColor: "green",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 28,
  },
  statsSection: {
    backgroundColor: "lightblue",
    width: "100%",
    gap: 4,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c3a56",
  },
  statsLine: {
    flexDirection: "row",
    gap: 12,
  },
  statsText: {
    width: "40%",
    fontSize: 16,
    color: "#1c3a56",
    textAlign: "right",
  },
  statsDinamicText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c3a56",
  },
});
