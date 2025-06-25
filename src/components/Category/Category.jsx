import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCategory } from "../../redux/products/slice";
import { selectCategory } from "../../redux/products/selectors";
import { useNavigate } from "react-router-dom";
import { stickerTypes } from "../../utils/utils";
import { useQuery } from "../../utils/utils";
import { useMediaQuery } from "react-responsive";

const Category = ({ category, icon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCategory = useSelector(selectCategory);
  const query = useQuery();
  const search = query.get("search");
  const isTablet = useMediaQuery({ maxWidth: 1000 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const handleFilterChange = (newType) => {
    const params = new URLSearchParams();
    const updatedFilters = {
      type: newType,
      search,
    };

    if (updatedFilters.type && newType !== "all")
      params.set("type", updatedFilters.type);

    dispatch(setCategory(newType));
    navigate(`?${params.toString()}`);
  };

  return (
    <Button
      disabled={currentCategory === category}
      onClick={() => handleFilterChange(category)}
      size="large"
      startIcon={icon}
      color="secondary"
      sx={{ padding: isMobile ? 0 : undefined, minWidth: "20px" }}
    >
      {!isTablet && stickerTypes[category]}
    </Button>
  );
};

export default Category;
