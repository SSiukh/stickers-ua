import { useDispatch } from "react-redux";
import BackLayout from "../components/BackLayout/BackLayout";
import CatalogList from "../components/CatalogList/CatalogList";
import CatalogSidebar from "../components/CatalogSidebar/CatalogSidebar";
import HelpBar from "../components/HelpBar/HelpBar";
import { useEffect } from "react";
import { fetchProducts } from "../redux/products/operations";

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <BackLayout>
        <CatalogSidebar />
        <CatalogList />
        <HelpBar />
      </BackLayout>
    </div>
  );
};

export default CatalogPage;
