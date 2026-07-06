import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../../store/auth.store";
import color from "../../api-hooks/styles/color";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin logout?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: user?.image,
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>

        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: color.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },

  logoutButton: {
    width: "100%",
    height: 48,
    backgroundColor: color.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  logoutText: {
    color: color.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
