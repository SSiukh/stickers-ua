import BackLayout from "../../components/BackLayout/BackLayout";
import CatalogList from "../../components/CatalogList/CatalogList";
import CatalogSidebar from "../../components/CatalogSidebar/CatalogSidebar";
import HelpBar from "../../components/HelpBar/HelpBar";
import s from "./CatalogPage.module.scss";

const CatalogPage = () => {
  return (
    <div>
      <BackLayout>
        <CatalogSidebar />
        <div className={s.container}>
          <CatalogList />
          <HelpBar />
        </div>
      </BackLayout>
    </div>
  );
};

export default CatalogPage;
