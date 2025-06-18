import { Link } from "react-router-dom";
import s from "./Footer.module.scss";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isTablet = useMediaQuery({ maxWidth: 850 });

  return (
    <section className={s.footer}>
      <div className="container">
        <div className={s.footer_container}>
          <h2 className={s.footerTabletTitle}>
            Насолоджуйся кожною миттю з нашими стікерами: тут стиль і якість
            поєднуються в кожному дизайні!
          </h2>
          <div className={s.footer_container_top}>
            <div className={s.footer_container_top_contacts}>
              <a href="#" className={s.footer_container_top_contacts_logo}>
                sticker ua
              </a>
              <div className={s.footer_container_top_contacts_icons}>
                <a
                  className={s.footer_container_top_contacts_icons_link}
                  href="#"
                >
                  <FaFacebookF
                    className={s.footer_container_top_contacts_icons_link_icon}
                  />
                </a>
                <a
                  className={s.footer_container_top_contacts_icons_link}
                  href="#"
                >
                  <FaInstagram
                    className={s.footer_container_top_contacts_icons_link_icon}
                  />
                </a>
                <a
                  className={s.footer_container_top_contacts_icons_link}
                  href="#"
                >
                  <FaTelegramPlane
                    className={s.footer_container_top_contacts_icons_link_icon}
                  />
                </a>
              </div>
            </div>
            <h2 className={s.footer_container_top_title}>
              Насолоджуйся кожною миттю з нашими стікерами: тут стиль і якість
              поєднуються в кожному дизайні!
            </h2>

            <a className={s.footer_container_top_tel} href="tel:+380662230636">
              +380 (66) 223-06-36
            </a>
          </div>
          {!isTablet && (
            <div className={s.footer_container_middle}>
              <ul className={s.footer_container_middle_list}>
                <li className={s.footer_container_middle_list_item}>
                  <Link
                    to="/"
                    className={s.footer_container_middle_list_item_link}
                  >
                    Головна
                  </Link>
                </li>
                <li className={s.footer_container_middle_list_item}>
                  <ScrollLink
                    to="about"
                    smooth={true}
                    duration={500}
                    className={s.footer_container_middle_list_item_link}
                  >
                    Найпопулярніші
                  </ScrollLink>
                </li>
                <li className={s.footer_container_middle_list_item}>
                  <Link
                    to="/catalog"
                    className={s.footer_container_middle_list_item_link}
                  >
                    Каталог
                  </Link>
                </li>
                <li className={s.footer_container_middle_list_item}>
                  <ScrollLink
                    to="discount"
                    smooth="true"
                    duration={500}
                    className={s.footer_container_middle_list_item_link}
                  >
                    Акції
                  </ScrollLink>
                </li>
                <li className={s.footer_container_middle_list_item}>
                  <ScrollLink
                    to="responses"
                    smooth="true"
                    duration={500}
                    className={s.footer_container_middle_list_item_link}
                  >
                    Відгуки
                  </ScrollLink>
                </li>
              </ul>
              <p className={s.footer_container_middle_address}>
                Україна, Луцьк, просп. Відродження, 43003
              </p>
            </div>
          )}

          <div className={s.footer_container_bottom}>
            <p className={s.footer_container_bottom_copyright}>
              &copy;2024 sticker ua.
            </p>
            <a
              href="https://github.com/SSiukh"
              className={s.footer_container_bottom_dev}
              target="_blank"
            >
              Dev: github/Ssiukh
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
