import { View, FlatList, StyleSheet } from "react-native";
import { useGetProductList } from "../../../api-hooks/product/product.query";
import React from "react";
import { useAuthStore } from "../../../store/auth.store";
import WelcomeCard from "../../../components/WelcomeCard";
import SearchBar from "../../../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../..";
import { Product } from "../../../api-hooks/product/product.model";
import ProductCard from "../../../components/modules/product-list/ProductCard";
import AppPagination from "../../../components/AppPagination";
import ProductCardSkeleton from "../../../components/modules/product-list/ProductCardSkeleton";
import ErrorView from "../../../components/ErrorView";
import EmptyView from "../../../components/EmptyView";

const limit = 30;
export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [query, setQuery] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const user = useAuthStore((state) => state.user);
  const { data, isLoading, refetch, error, isRefetching } = useGetProductList({
    params: {
      q: query,
      limit: limit,
      skip: (page - 1) * limit,
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);
  const debounced = useDebouncedCallback((value) => {
    setQuery(value);
  }, 800);

  const onChangeText = (text: string) => {
    setSearch(text);
    debounced(text);
  };

  const navigateProductDetail = React.useCallback((product: Product) => {
    navigation.navigate("ProductDetailScreen", { product });
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <SafeAreaView edges={{ top: "maximum" }} style={styles.container}>
      <View style={styles.px10}>
        <WelcomeCard firstName={user?.firstName!} lastName={user?.lastName!} />
        <SearchBar value={search} onChangeText={onChangeText} />
      </View>
      <FlatList
        data={data?.products || []}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigateProductDetail(item)}
          />
        )}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={
          isLoading ? (
            <ProductCardSkeleton />
          ) : error ? (
            <ErrorView retryText="retry" onRetry={refetch} message="" />
          ) : (
            <EmptyView />
          )
        }
        ListFooterComponent={
          data?.products?.length! > 0 ? (
            <AppPagination
              page={page}
              totalPages={totalPages}
              onPrevious={() => setPage((p) => p - 1)}
              onNext={() => setPage((p) => p + 1)}
            />
          ) : (
            <></>
          )
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  px10: {
    paddingHorizontal: 10,
  },
  flatList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
