import { Button, IconButton, TextField } from "@mui/material";
import s from "./HelpBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectColor, selectKeyword } from "../../redux/products/selectors";
import { setColor, setKeyword } from "../../redux/products/slice";
import stickers from "../../data/stickers.json";
import { FaCircle } from "react-icons/fa";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../utils/utils";
import { fetchProducts } from "../../redux/products/operations";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useMediaQuery } from "react-responsive";

const HelpBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const allColors = stickers.map((item) => item.color);
  const colors = [...new Set(allColors)];
  const currentColor = useSelector(selectColor);
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get("type");
  const color = query.get("color");
  const search = query.get("search");
  const [searchInput, setSearchInput] = useState(keyword);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setKeyword(searchInput));

      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (color) params.set("color", color);
      if (searchInput.trim() !== "") {
        params.set("search", searchInput.trim());
      }

      dispatch(fetchProducts({ type, color, search: searchInput.trim() }));
      navigate(`?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput, dispatch, type, color, navigate]);

  const handleFilterChange = (newColor) => {
    const params = new URLSearchParams();
    const updatedFilters = {
      type,
      color: newColor,
      search,
    };

    if (updatedFilters.color && newColor !== "all")
      params.set("color", updatedFilters.color);
    if (updatedFilters.type) params.set("type", updatedFilters.type);
    if (updatedFilters.search) params.set("search", updatedFilters.search);

    dispatch(setColor(newColor));
    dispatch(fetchProducts(updatedFilters));
    navigate(`?${params.toString()}`);
  };

  return (
    <div className={s.container}>
      <TextField
        type="text"
        size="small"
        label="Пошук"
        variant="outlined"
        color="primary"
        fullWidth
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        className={s.search}
      />
      <div className={s.colorPicker}>
        <div>
          <p className={s.colorText}>Виберіть кольори: </p>
          <ul className={s.colorsList}>
            {colors.map((color) => (
              <li
                className={clsx(
                  s.colorItem,
                  currentColor === color && s.borderedColorItem
                )}
                key={color}
              >
                <IconButton onClick={() => handleFilterChange(color)}>
                  <FaCircle color={color} />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => handleFilterChange("")}
          size="small"
          color="secondary"
          variant="outlined"
        >
          {isMobile ? <ClearIcon /> : "Очистити"}
        </Button>
      </div>
    </div>
  );
};

export default HelpBar;
