import Script from "next/script";
import {
  GTM_CONTAINER_ID,
  GTM_NOSCRIPT_TITLE,
  GTM_SCRIPT_ID,
} from "@/lib/constants/analytics";

/**
 * Google Tag Manager — head script + body noscript fallback.
 * Container: GTM-WS7FLL29 (my.teksage.app).
 */
export function GoogleTagManager() {
  return (
    <>
      <Script id={GTM_SCRIPT_ID} strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          className="hidden"
          title={GTM_NOSCRIPT_TITLE}
        />
      </noscript>
    </>
  );
}
