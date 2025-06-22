import { Autocomplete, Button, TextField } from "@mui/material";
import s from "./WarehouseForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWarehouseKeyword,
  selectWarehouses,
} from "../../redux/locations/selectors";
import { setWarehousesKeyword } from "../../redux/locations/slice";
import { getWarehousesByIdName } from "../../redux/locations/operations";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MdLocationOn } from "react-icons/md";
import { setWarehouse } from "../../redux/order/slice";
import { selectLocation, selectWarehouse } from "../../redux/order/selectors";

const WarehouseForm = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectWarehouseKeyword);
  const warehouses = useSelector(selectWarehouses);
  const city = useSelector(selectLocation);
  const warehouse = useSelector(selectWarehouse);

  const [inputValue, setInputValue] = useState(keyword || "");
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    setInputValue(keyword || "");
  }, [keyword]);

  useEffect(() => {
    if (city?.MainDescription) {
      dispatch(
        getWarehousesByIdName({
          cityName: city.MainDescription,
          warehouseId: undefined,
        })
      );
    }
  }, [dispatch, city]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    dispatch(setWarehousesKeyword(newInputValue));

    const parsedId = +newInputValue;
    if (!isNaN(parsedId)) {
      dispatch(
        getWarehousesByIdName({
          cityName: city?.MainDescription,
          warehouseId: parsedId,
        })
      );
    }
  };

  const handleOptionSelect = (event, newValue) => {
    if (newValue) {
      setSelectedWarehouse(newValue);
      setInputValue(newValue.Description || newValue.Present || "");
      dispatch(setWarehousesKeyword(newValue.Description || ""));
    }
  };

  const handleSubmit = () => {
    setFormIsOpen(false);
    dispatch(setWarehouse(selectedWarehouse || inputValue));
  };

  return (
    <div className={clsx(s.container, !formIsOpen && s.infoContainer)}>
      {formIsOpen && <h2 className={s.title}>Виберіть відділення/поштомат</h2>}
      {formIsOpen ? (
        <div className={s.form}>
          <Autocomplete
            className={s.field}
            options={Array.isArray(warehouses) ? warehouses : []}
            getOptionLabel={(option) => option.Description || ""}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Виберіть відділення/поштомат"
                variant="outlined"
              />
            )}
          />
          <Button
            onClick={handleSubmit}
            size="large"
            variant="contained"
            disabled={!selectedWarehouse}
          >
            Застосувати
          </Button>
        </div>
      ) : (
        <div className={s.infoBlock}>
          <div className={s.infoMainBlock}>
            <MdLocationOn size={20} className={s.icon} />
            <p className={s.location}>{warehouse?.Description}</p>
          </div>
          <Button onClick={() => setFormIsOpen(true)}>Змінити</Button>
        </div>
      )}
    </div>
  );
};

export default WarehouseForm;
