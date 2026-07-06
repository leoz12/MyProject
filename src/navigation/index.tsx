import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import EditProductScreen, {
  EditProductScreenParams,
} from "./screens/product/EditProductScreen";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./screens/HomeScreen";
import { useAuthStore } from "../store/auth.store";
import ProductDetailScreen, {
  ProductDetailScreenParams,
} from "./screens/product/ProductDetailScreen";

export type StackParamList = {
  ["LoginScreen"]: undefined;
  ["ProductListScreen"]: undefined;
  ["ProductDetailScreen"]: ProductDetailScreenParams;
  ["AddProductScreen"]: undefined;
  ["EditProductScreen"]: EditProductScreenParams;
  ["ProfileScreen"]: undefined;
  ["PromoScreen"]: undefined;
  ["NotificationScreen"]: undefined;
  ["HomeScreen"]: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function Navigation() {
  const isAuthenthicated = useAuthStore((state) => state.token);
  return (
    <NavigationContainer
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenthicated ? (
          <Stack.Group>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
            />
            <Stack.Screen
              name="EditProductScreen"
              component={EditProductScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
