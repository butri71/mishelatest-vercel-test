import Image from "next/image";
import Link from "next/link";
import initTranslations from '@/i18n'

import DownloadButton from "./DownloadButton";

export default async function AppBanner({ lang }) {
  const { t } = await initTranslations(lang, ['application'])

  return (
    <section className="app-promo">
      <div className="app-content">      
        <h2>{t('application.promoTitle')}</h2>
        <h3>{t('application.promoSubtitle')}</h3>
        <div className="mt-20">        
          <p>{t('application.promoText')}</p>
          <ul>           
            {t('application.promoKeyFeatures').map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}           
          </ul>
        </div>
        <div className="app-buttons">
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
      <div className="app-screenshot">
        <Image
          src="/images/home-ipad.png"
          alt="Cocktail app screenshot"
          width={400}
          height={265}
          priority={false}
        // fill={true}
        // sizes="(max-width: 300px) 100vw, 200px"
        />
        {/* <div className="btnBanner">
          <Link href={`/${lang}/mishela-app`} className="cta-button-red">
            {t('application.check')}
          </Link>
        </div> */}
      </div>
    </section>
  );
}
