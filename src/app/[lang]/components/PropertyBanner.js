import Image from "next/image";
import DownloadButton from "./DownloadButton";
import initTranslations from '@/i18n'

import './components.css';
import "../css/banner.css";

export default async function PropertyBanner({ lang }) {
  const { t } = await initTranslations(lang, ['application'])  

  return (
    <section className="banner-section">
      <div className="banner-content">
        {/* <h2 className="banner-title">{content.bannerTitle}</h2> 
        <p className="banner-subtitle">{content.bannerDescription}</p>  */}
        <h2 className="banner-title">{t('application.bannerTitle')}</h2> 
        <p className="banner-subtitle">{t('application.bannerDescription')}</p> 
        <div className="banner-container" >
          <DownloadButton
            platform="Android"
            url="https://play.google.com/store/apps/details?id=com.maxaquilino.mishela"
          />
          <DownloadButton
            platform="iOS"
            url="https://apps.apple.com/us/app/mishela-cocktails/id1548143655"
          />
        </div>
      </div>
      <div className="mockups">
        <Image
          src="/images/app_download.png"
          alt="Download Mishela Cocktails Appw"         
          width={410}
          height={450}
          className="mockup-image"
        />
      </div>
    </section>
  );
}
