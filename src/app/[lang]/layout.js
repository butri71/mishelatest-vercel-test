import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Breadcrumb from "./layout/Breadcrumb";
import "./css/layout.css"

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;
  // const is404 = !children;

  // console.log("is404: ",is404)
  return (
    <div className="layout-container">
      <Header lang={lang} />
      <Breadcrumb lang={lang} />
      <main className="main-content">
        {children}      
      </main>
      <Footer lang={lang} />
    </div>
  );
}
