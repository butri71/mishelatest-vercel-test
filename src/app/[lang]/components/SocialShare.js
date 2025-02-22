// SocialShare.js
'use client';
import { usePathname, useSearchParams } from 'next/navigation';

const shareIcons = {
    facebook: "https://platform-cdn.sharethis.com/img/facebook.svg",
    x: "https://platform-cdn.sharethis.com/img/twitter.svg",
    whatsapp: "https://platform-cdn.sharethis.com/img/whatsapp.svg",
    pinterest: "https://platform-cdn.sharethis.com/img/pinterest.svg"
};

export default function SocialShare({ title, img, caller }) {    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://mishela.app';
    const path = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    const currentUrl = `${domain}${path}`;
    const fullImageUrl = `${domain}/images/${caller}/${img}`; 
    // console.log("SocialShare image: ",fullImageUrl)
    // console.log("SocialShare caller: ",caller)
    
    const getShareUrl = (network) => {
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedTitle = encodeURIComponent(title);
        const encodedImage = encodeURIComponent(fullImageUrl);

        const urls = {
            facebook: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
            // x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&card_type=summary_large_image`,
            whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
            pinterest: `http://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`
        };

        return urls[network];
    };

    const handleShare = (e, network) => {
        e.preventDefault();
        const width = 600;
        const height = 400;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(
            getShareUrl(network),
            'share',
            `width=${width},height=${height},left=${left},top=${top}`
        );
    };

    return (
        <div className="social-share">
            {/* <span
                className="social-share__link social-share__link--facebook"
                data-network="facebook"
                onClick={(e) => handleShare(e, 'facebook')}
                tabIndex="0"
                title="Share on Facebook"
                aria-label="Share on Facebook"
                role="button"
            >
                <img
                    src={shareIcons.facebook}
                    alt="Share on Facebook"
                    className="social-share__icon"
                    loading="lazy"
                />
            </span> */}

            <span
                className="social-share__link social-share__link--x"
                data-network="x"
                onClick={(e) => handleShare(e, 'x')}
                tabIndex="0"
                title="Share on X"
                aria-label="Share on X"
                role="button"
            >
                <img
                    src={shareIcons.x}
                    alt="Share on X"
                    className="social-share__icon"
                    loading="lazy"
                />
            </span>

            <span
                className="social-share__link social-share__link--whatsapp"
                data-network="whatsapp"
                onClick={(e) => handleShare(e, 'whatsapp')}
                tabIndex="0"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
                role="button"
            >
                <img
                    src={shareIcons.whatsapp}
                    alt="Share on WhatsApp"
                    className="social-share__icon"
                    loading="lazy"
                />
            </span>

            <span
                className="social-share__link social-share__link--pinterest"
                data-network="pinterest"
                onClick={(e) => handleShare(e, 'pinterest')}
                tabIndex="0"
                title="Share on Pinterest"
                aria-label="Share on Pinterest"
                role="button"
            >
                <img
                    src={shareIcons.pinterest}
                    alt="Share on Pinterest"
                    className="social-share__icon"
                    loading="lazy"
                />
            </span>
        </div>
    );
}