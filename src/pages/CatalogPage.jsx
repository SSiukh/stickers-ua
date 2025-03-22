import BackLayout from "../components/BackLayout/BackLayout";
import CatalogList from "../components/CatalogList/CatalogList";
import CatalogSidebar from "../components/CatalogSidebar/CatalogSidebar";
import HelpBar from "../components/HelpBar/HelpBar";

const CatalogPage = () => {
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
