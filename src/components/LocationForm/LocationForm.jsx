import { Autocomplete, Button, TextField } from "@mui/material";
import s from "./LocationForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectKeyword,
  selectSettlements,
} from "../../redux/locations/selectors";
import { setLocationsKeyword } from "../../redux/locations/slice";
import { getLocationsByName } from "../../redux/locations/operations";
import { useState } from "react";
import clsx from "clsx";
import { MdLocationOn } from "react-icons/md";
import { setLocation } from "../../redux/order/slice";
import { selectLocation } from "../../redux/order/selectors";

const LocationForm = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const settlements = useSelector(selectSettlements);
  const [inputValue, setInputValue] = useState(keyword);
  const [formIsOpen, setFormIsOpen] = useState(true);
  const location = useSelector(selectLocation);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    dispatch(setLocationsKeyword(newInputValue));

    if (newInputValue.length > 2) {
      dispatch(getLocationsByName(newInputValue));
    }
  };

  const handleOptionSelect = (event, newValue) => {
    if (newValue) {
      dispatch(setLocationsKeyword(newValue.Present));
    }
  };

  const handleSubmit = () => {
    setFormIsOpen(false);
    dispatch(setLocation(inputValue));
  };

  return (
    <div className={clsx(s.container, !formIsOpen && s.infoContainer)}>
      {formIsOpen && <h2 className={s.title}>Виберіть локацію</h2>}
      {formIsOpen ? (
        <div className={s.form}>
          <Autocomplete
            className={s.field}
            options={settlements?.Addresses || []}
            getOptionLabel={(option) => option.Present || ""}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Виберіть населений пункт"
                variant="outlined"
              />
            )}
          />
          <Button onClick={handleSubmit} size="large" variant="contained">
            Застосувати
          </Button>
        </div>
      ) : (
        <div className={s.infoBlock}>
          <div className={s.infoMainBlock}>
            <MdLocationOn size={20} className={s.icon} />
            <p className={s.location}>{location}</p>
          </div>
          <Button onClick={() => setFormIsOpen(true)}>Змінити</Button>
        </div>
      )}
    </div>
  );
};

export default LocationForm;
