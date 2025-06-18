import { Autocomplete, Button, TextField } from "@mui/material";
import s from "./WarehouseForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWarehouseKeyword,
  selectWarehouses,
} from "../../redux/locations/selectors";
import { setWarehousesKeyword } from "../../redux/locations/slice";
import { getWarehousesByIdName } from "../../redux/locations/operations";
import { useState } from "react";
import clsx from "clsx";
import { MdLocationOn } from "react-icons/md";
import { setWarehouse } from "../../redux/order/slice";
import { selectWarehouse } from "../../redux/order/selectors";

const WarehouseForm = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectWarehouseKeyword);
  const warehouses = useSelector(selectWarehouses);
  const [inputValue, setInputValue] = useState(keyword);
  const [formIsOpen, setFormIsOpen] = useState(true);
  const warehouse = useSelector(selectWarehouse);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    dispatch(setWarehousesKeyword(newInputValue));

    dispatch(
      getWarehousesByIdName({ cityName: "Луцьк", warehouseId: +newInputValue })
    );
  };

  const handleOptionSelect = (event, newValue) => {
    if (newValue) {
      dispatch(setWarehousesKeyword(newValue.Present));
    }
  };

  const handleSubmit = () => {
    setFormIsOpen(false);
    dispatch(setWarehouse(inputValue));
  };

  return (
    <div className={clsx(s.container, !formIsOpen && s.infoContainer)}>
      {formIsOpen && <h2 className={s.title}>Виберіть відділення/поштомат</h2>}
      {formIsOpen ? (
        <div className={s.form}>
          <Autocomplete
            className={s.field}
            options={warehouses?.Addresses || []}
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
            <p className={s.location}>{warehouse}</p>
          </div>
          <Button onClick={() => setFormIsOpen(true)}>Змінити</Button>
        </div>
      )}
    </div>
  );
};

export default WarehouseForm;
