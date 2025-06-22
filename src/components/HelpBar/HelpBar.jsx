import { TextField } from "@mui/material";
import s from "./HelpBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyword } from "../../redux/products/selectors";
import { setKeyword } from "../../redux/products/slice";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../utils/utils";
import { useEffect, useState } from "react";

const HelpBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get("type");
  const [searchInput, setSearchInput] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setKeyword(searchInput));

      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (searchInput.trim() !== "") {
        params.set("search", searchInput.trim());
      }

      navigate(`?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput, dispatch, type, navigate]);

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
    </div>
  );
};

export default HelpBar;
