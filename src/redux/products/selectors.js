export const selectCategory = (state) => state.products.filter.category;
export const selectKeyword = (state) => state.products.filter.keyword;
export const selectColor = (state) => state.products.filter.color;
export const selectItems = (state) => state.products.items;
export const selectIsLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectCurrentItem = (state) => state.products.currentItem;
