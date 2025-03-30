export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.user.username;
export const selectEmail = (state) => state.auth.user.email;
export const selectPhoneNumber = (state) => state.auth.user.phoneNumber;
export const selectFirstName = (state) => state.auth.user.firstName;
export const selectLastName = (state) => state.auth.user.lastName;
export const selectMiddleName = (state) => state.auth.user.middleName;
