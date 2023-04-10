import React from "react";
import axios from "axios";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
} from "react-native";

const Base_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [searchText, setSearch] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(Base_URL)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.log("An error occured", response.status);
        }
      })
      .catch((error) => {
        console.log("An error occured", error);
      });
  }, []);

  const onChangeText = (text) => {
    setSearch(text);
  };

  const onPress = () => {
    const filterData = posts.filter((item) => item.title.includes(searchText));
    setPosts(filterData);
  };

  const keyExtract = (item) => {
    return item.id.toString();
  };

  const renderCard = React.useCallback(({ item, index }) => {
    return (
      <View style={styles.cardStyle}>
        <Text>
          {index + 1}
          {". "}
          {item.title}
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.app}>
      <TextInput
        style={styles.inputStyle}
        placeholder={"Enter Search Text"}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.buttonStyle}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={keyExtract}
        style={styles.listStyle}
        renderItem={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    // marginHorizontal: "auto",
    // maxWidth: 500,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    hieght: 50
  },
  buttonStyle: {
    backgroundColor: "#00DDFF",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  listStyle: {
    maxHeight: 300
  },
  cardStyle: {
    backgroundColor: "#EEEEEE",
    margin: 5,
    padding: 5,
    borderRadius: 5
  }
});

export default App;
