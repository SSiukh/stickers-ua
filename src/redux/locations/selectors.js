export const selectSettlements = (state) => state.locations.settlements;
export const selectKeyword = (state) => state.locations.keyword;

{
  /* <Autocomplete
  options={settlements}
  inputValue={keyword}
  getOptionLabel={(option) => option.Present || ""}
  onChange={(e) => handleChange(e)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Виберіть населений пункт"
      variant="outlined"
    />
  )}
/>; */
}
