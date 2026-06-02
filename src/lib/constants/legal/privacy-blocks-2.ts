import type { LegalBlock } from "@/types/settings-legal";
import { LEGAL_SUPPORT_EMAIL } from "@/lib/constants/legal/shared";

/** Privacy policy blocks (part 2) — Flutter `privacy_page.dart`. */
export const PRIVACY_LEGAL_BLOCKS_PART_2: readonly LegalBlock[] = [
  {
    type: "subsection",
    title: "Retention of Your Personal Data",
    body: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.\n\nThe Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
  },
  {
    type: "subsection",
    title: "Transfer of Your Personal Data",
    body: "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.\n\nYour consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.\n\nThe Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.",
  },
  {
    type: "subsection",
    title: "Delete Your Personal Data",
    body: "You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.\n\nOur Service may give You the ability to delete certain information about You from within the Service.\n\nYou may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.\n\nPlease note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.",
  },
  { type: "heading", text: "Disclosure of Your Personal Data" },
  {
    type: "subsection",
    title: "Business Transactions",
    body: "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.",
  },
  {
    type: "subsection",
    title: "Law enforcement",
    body: "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).",
  },
  {
    type: "subsection",
    title: "Other legal requirements",
    body: "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:",
  },
  {
    type: "bullets",
    items: [
      "Comply with a legal obligation",
      "Protect and defend the rights or property of the Company",
      "Prevent or investigate possible wrongdoing in connection with the Service",
      "Protect the personal safety of Users of the Service or the public",
      "Protect against legal liability",
    ],
  },
  {
    type: "subsection",
    title: "Security of Your Personal Data",
    body: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
  },
  {
    type: "subsection",
    title: "Children's Privacy",
    body: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.\n\nIf We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.",
  },
  {
    type: "subsection",
    title: "Links to Other Websites",
    body: "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.\n\nWe have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
  },
  {
    type: "subsection",
    title: "Changes to this Privacy Policy",
    body: 'We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.\n\nWe will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.\n\nYou are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.',
  },
  {
    type: "subsection",
    title: "Use of Third-Party AI Services (OpenAI)",
    body: "To generate personalized astrological predictions, Teksage may send your calculated horoscope data (based on the birth details you provide) to third-party AI service providers, such as OpenAI. This data is used exclusively for generating predictive responses and is not used for any advertising or profiling purposes.\nTeksage does not control how OpenAI or similar providers process this data once it is transmitted. We encourage users to review OpenAI's Privacy Policy to understand how their information may be handled by these services. We take necessary measures to anonymize or limit the data sent to third parties to only what is essential for prediction purposes.",
  },
  {
    type: "contact",
    intro: "If you have any questions about this Privacy Policy, You can contact us:",
    email: LEGAL_SUPPORT_EMAIL,
  },
] as const;
