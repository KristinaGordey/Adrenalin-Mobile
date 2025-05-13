import { Linking } from "react-native";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const videos = [
  {
    title: "Разминка перед тренировкой",
    thumbnail: require("./assets/z.jpg"),
    videoId: "LpcfvYu6z-s",
  },
  {
    title: "Силовая тренировка",
    thumbnail: require("./assets/z.jpg"),
    videoId: "3GwjfUFyY6M",
  },
  {
    title: "Кардио-занятие",
    thumbnail: require("./assets/z.jpg"),
    videoId: "C57lwUj3z1o",
  },
  {
    title: "Интервальная тренировка",
    thumbnail: require("./assets/z.jpg"),
    videoId: "Ib44QCcjsU8",
  },
  {
    title: "Cтеп аэробика",
    thumbnail: require("./assets/z.jpg"),
    videoId: "Mz4uUm20H3Y",
  },
  {
    title: "Йога",
    thumbnail: require("./assets/z.jpg"),
    videoId: "E1JT1CKEOuA",
  },
];

const openYouTube = (videoId) => {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
};

export default function VideoExample() {
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => openYouTube(item.videoId)}
          >
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <Text style={styles.videoTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  thumbnail: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  videoTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
});
