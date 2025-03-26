import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCategory } from "../../redux/products/slice";
import { selectCategory } from "../../redux/products/selectors";

const Category = ({ category, icon }) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCategory);

  return (
    <Button
      disabled={currentCategory === category}
      onClick={() => dispatch(setCategory(category))}
      size="large"
      startIcon={icon}
      color="secondary"
    >
      {category}
    </Button>
  );
};

export default Category;
