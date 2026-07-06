import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductListScreen from "./product/ProductListScreen";
import CommingSoonScreen from "./CommingSoonScreen";
import AddProductScreen from "./product/AddProductScreen";
import AntDesign from "@react-native-vector-icons/ant-design";
import ProfileScreen from "./ProfileScreen";

export type BottomTabParamList = {
  ["ProductListScreen"]: undefined;
  ["PromoScreen"]: undefined;
  ["AddProductScreen"]: undefined;
  ["NotificationScreen"]: undefined;
  ["ProfileScreen"]: undefined;
};

export default function HomeScreen() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={"ProductListScreen"}
        component={ProductListScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign
              name="shopping-cart"
              color={props.color}
              size={props.size}
            />
          ),
          tabBarLabel: "Products",
        }}
      />
      <Tab.Screen
        name={"PromoScreen"}
        component={CommingSoonScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="tag" color={props.color} size={props.size} />
          ),
          tabBarLabel: "Promo",
        }}
      />
      <Tab.Screen
        name={"AddProductScreen"}
        component={AddProductScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign
              name="plus-circle"
              color={props.color}
              size={props.size}
            />
          ),
          tabBarLabel: "Add",
        }}
      />
      <Tab.Screen
        name={"NotificationScreen"}
        component={CommingSoonScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="bell" color={props.color} size={props.size} />
          ),
          tabBarLabel: "Notif",
        }}
      />
      <Tab.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="user" color={props.color} size={props.size} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
