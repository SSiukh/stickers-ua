export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectName = (state) => state.auth.user.name;
export const selectEmail = (state) => state.auth.user.email;
export const selectRole = (state) => state.auth.user.role;
export const selectPhoneNumber = (state) => state.auth.user.phoneNumber;
export const selectToken = (state) => state.auth.token;
