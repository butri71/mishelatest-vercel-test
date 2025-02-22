
import DownloadButton from "./DownloadButton";
import initTranslations from '@/i18n'

export default async function AppBanner({ lang }) {
  const { t } = await initTranslations(lang, ['application'])

  return (
    <section className="app-promo">
      <div className="app-content-row">
        <div style={{ width: "60%" }}>
          <h2>{t('application.promoTitle')}</h2>
          <h3>{t('application.promoSubtitle')}</h3>         
        </div>
        <div className="app-buttons-row">
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
    </section>
  );
}
