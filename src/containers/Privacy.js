import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    outerWrapper: {
        backgroundImage: `url(${process.env.PUBLIC_URL + `/assets/tos.png`})`,
        backgroundSize: 'cover',
        width: '685px',
        height: '525px',
        padding: theme.spacing(8,8,6,10)
    },
    textWrapper: {
        overflowY: 'scroll',
        width: '675px',
        height: '400px',
        color: theme.palette.common.black,
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(140,70,40,.4)',
            borderRadius: 20,
            outline: '1px solid slategrey'
        }
    },
    typography: {
        marginBottom: theme.spacing(2)
    },
}));

function Privacy() {

    const classes = useStyles();

    return (
        <div className={classes.outerWrapper}>
            <div className={classes.textWrapper}>

            <Typography variant='h3'>Privacy Policy</Typography>

<Typography variant='body2'>Last updated: March 01, 2020</Typography>

<Typography variant='body2'>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Typography>

<Typography variant='body2'>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</Typography>

<Typography variant='h3'>Interpretation and Definitions</Typography>
<Typography variant='h4'>Interpretation</Typography>
<Typography variant='body2'>The words of which the initial letter is capitalized have meanings defined under the following conditions.</Typography>
<Typography variant='body2'>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Typography>

<Typography variant='h4'>Definitions</Typography>
<Typography variant='body2'>For the purposes of this Privacy Policy:</Typography>
<Typography variant='body2'>
<ul>
    <li>
        <Typography variant='body2'><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Typography>
        <Typography variant='body2'>Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.</Typography>    </li>
    <li>
        <Typography variant='body2'><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Nook Horizons.</Typography>
        <Typography variant='body2'>For the purpose of the GDPR, the Company is the Data Controller.</Typography>    </li>
        <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
    <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
    <li><strong>Website</strong> refers to Nook Horizons, accessible from https://nookhorizons.com</li>        <li><strong>Service</strong> refers to the Website.</li>
        <li><strong>Country</strong> refers to: United Kingdom</li>
    <li>
        <Typography variant='body2'><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Typography>
        <Typography variant='body2'>For the purpose of the GDPR, Service Providers are considered Data Processors.</Typography>    </li>
    <li><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</li>
        <li>
        <Typography variant='body2'><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</Typography>
        <Typography variant='body2'>For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.</Typography>        <Typography variant='body2'>For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</Typography>    </li>
    <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>        <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
    <li><strong>Data Controller</strong>, for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.</li>    <li><strong>Do Not Track</strong> (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.</li>        <li><strong>Business</strong>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers' personal information and determines the purposes and means of the processing of Consumers' personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers' personal information, that does business in the State of California.</li>
    <li><strong>Consumer</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</li>
    <li><strong>Sale</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer’s Personal information to another business or a third party for monetary or other valuable consideration.</li>
    </ul>
    </Typography>

<Typography variant='h3'>Collecting and Using Your Personal Data</Typography>
<Typography variant='h4'>Types of Data Collected</Typography>

<Typography variant='h5'>Personal Data</Typography>
<Typography variant='body2'>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</Typography>
<Typography variant='body2'>
<ul>
    <li>Email address</li>                    <li>Usage Data</li>
</ul>
</Typography>


<Typography variant='h5'>Usage Data</Typography>
<Typography variant='body2'>Usage Data is collected automatically when using the Service.</Typography>
<Typography variant='body2'>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Typography>
<Typography variant='body2'>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</Typography>
<Typography variant='body2'>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</Typography>



<Typography variant='h5'>Tracking Technologies and Cookies</Typography>
<Typography variant='body2'>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.</Typography>
<Typography variant='body2'>You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.</Typography>
<Typography variant='body2'>Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</Typography>
<Typography variant='body2'>We use both session and persistent Cookies for the purposes set out below:</Typography>
<Typography variant='body2'>
<ul>
    <li>
        <Typography variant='body2'><strong>Necessary / Essential Cookies</strong></Typography>
        <Typography variant='body2'>Type: Session Cookies</Typography>
        <Typography variant='body2'>Administered by: Us</Typography>
        <Typography variant='body2'>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</Typography>
    </li>
      <li>
          <Typography variant='body2'><strong>Cookies Policy / Notice Acceptance Cookies</strong></Typography>
          <Typography variant='body2'>Type: Persistent Cookies</Typography>
          <Typography variant='body2'>Administered by: Us</Typography>
          <Typography variant='body2'>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</Typography>
      </li>
    <li>
        <Typography variant='body2'><strong>Functionality Cookies</strong></Typography>
        <Typography variant='body2'>Type: Persistent Cookies</Typography>
        <Typography variant='body2'>Administered by: Us</Typography>
        <Typography variant='body2'>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</Typography>
    </li>
    </ul>
    </Typography>
<Typography variant='body2'>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy.</Typography>

<Typography variant='h4'>Use of Your Personal Data</Typography>
<Typography variant='body2'>The Company may use Personal Data for the following purposes:</Typography>
<Typography variant='body2'>
<ul>
    <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
    <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
    <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
    <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
    <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
    <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
</ul>
</Typography>

<Typography variant='body2'>We may share your personal information in the following situations:</Typography>

<Typography variant='body2'>
<ul>
    <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, to contact You, to advertise on third party websites to You after You visited our Service or for payment processing.</li>
    <li><strong>For Business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</li>
    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
    <li><strong>With Business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
    <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
</ul>
</Typography>

<Typography variant='h4'>Retention of Your Personal Data</Typography>
<Typography variant='body2'>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</Typography>
<Typography variant='body2'>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Typography>

<Typography variant='h4'>Transfer of Your Personal Data</Typography>
<Typography variant='body2'>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</Typography>
<Typography variant='body2'>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</Typography>
<Typography variant='body2'>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</Typography>

<Typography variant='h4'>Disclosure of Your Personal Data</Typography>
<Typography variant='h5'>Business Transactions</Typography>
<Typography variant='body2'>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</Typography>
<Typography variant='h5'>Law enforcement</Typography>
<Typography variant='body2'>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Typography>
<Typography variant='h5'>Other legal requirements</Typography>
<Typography variant='body2'>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Typography>
<Typography variant='body2'>
<ul>
    <li>Comply with a legal obligation</li>
    <li>Protect and defend the rights or property of the Company</li>
    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
    <li>Protect the personal safety of Users of the Service or the public</li>
    <li>Protect against legal liability</li>
</ul>
</Typography>

<Typography variant='h4'>Security of Your Personal Data</Typography>
<Typography variant='body2'>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</Typography>

<Typography variant='h3'>Detailed Information on the Processing of Your Personal Data</Typography>
<Typography variant='body2'>Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.</Typography>



<Typography variant='h4'>Email Marketing</Typography>
<Typography variant='body2'>We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.</Typography>
<Typography variant='body2'>We may use Email Marketing Service Providers to manage and send emails to You.</Typography>
    

<Typography variant='h4'>Payments</Typography>
<Typography variant='body2'>We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</Typography>
<Typography variant='body2'>We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</Typography>
<Typography variant='body2'>
<ul>
    <li>
        <Typography variant='body2'><strong>PayPal</strong></Typography>
        <Typography variant='body2'>Their Privacy Policy can be viewed at <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full">https://www.paypal.com/webapps/mpp/ua/privacy-full</a></Typography>
    </li>
</ul>
</Typography>



<Typography variant='h3'>GDPR Privacy</Typography>
<Typography variant='h4'>Legal Basis for Processing Personal Data under GDPR</Typography>
<Typography variant='body2'>We may process Personal Data under the following conditions:</Typography>

<Typography variant='body2'>
<ul>
    <li><strong>Consent:</strong> You have given Your consent for processing Personal Data for one or more specific purposes.</li>
    <li><strong>Performance of a contract:</strong> Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.</li>
    <li><strong>Legal obligations:</strong> Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</li>
    <li><strong>Vital interests:</strong> Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</li>
    <li><strong>Public interests:</strong> Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.</li>
    <li><strong>Legitimate interests:</strong> Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</li>
</ul>
</Typography>
<Typography variant='body2'>In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</Typography>

<Typography variant='h4'>Your Rights under the GDPR</Typography>
<Typography variant='body2'>The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.</Typography>
<Typography variant='body2'>You have the right under this Privacy Policy, and by law if You are within the EU, to:</Typography>

<Typography variant='body2'>
<ul>
    <li><strong>Request access to Your Personal Data.</strong> The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.</li>
    <li><strong>Request correction of the Personal Data that We hold about You.</strong> You have the right to to have any incomplete or inaccurate information We hold about You corrected.</li>
    <li><strong>Object to processing of Your Personal Data.</strong> This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.</li>
    <li><strong>Request erasure of Your Personal Data.</strong> You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.</li>
    <li><strong>Request the transfer of Your Personal Data.</strong> We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.</li>
    <li><strong>Withdraw Your consent.</strong> You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.</li>
</ul>
</Typography>

<Typography variant='h4'>Exercising of Your GDPR Data Protection Rights</Typography>
<Typography variant='body2'>You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.</Typography>
<Typography variant='body2'>You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.</Typography>


<Typography variant='h3'>CCPA Privacy</Typography>
<Typography variant='h4'>Your Rights under the CCPA</Typography>
<Typography variant='body2'>Under this Privacy Policy, and by law if You are a resident of California, You have the following rights:</Typography>
<Typography variant='body2'>
<ul>
    <li><strong>The right to notice.</strong> You must be properly notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</li>
    <li><strong>The right to access / the right to request.</strong> The CCPA permits You to request and obtain from the Company information regarding the disclosure of Your Personal Data that has been collected in the past 12 months by the Company or its subsidiaries to a third-party for the third party’s direct marketing purposes.</li>
    <li><strong>The right to say no to the sale of Personal Data.</strong> You also have the right to ask the Company not to sell Your Personal Data to third parties. You can submit such a request by visiting our "Do Not Sell My Personal Information" section or web page.</li>
    <li>
        <Typography variant='body2'><strong>The right to know about Your Personal Data.</strong> You have the right to request and obtain from the Company information regarding the disclosure of the following:</Typography>
        <ul>
            <li>The categories of Personal Data collected</li>
            <li>The sources from which the Personal Data was collected</li>
            <li>The business or commercial purpose for collecting or selling the Personal Data</li>
            <li>Categories of third parties with whom We share Personal Data</li>
            <li>The specific pieces of Personal Data we collected about You</li>
        </ul>
    </li>
    <li><strong>The right to delete Personal Data.</strong> You also have the right to request the deletion of Your Personal Data that have been collected in the past 12 months.</li>
    <li>
        <Typography variant='body2'><strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your Consumer's rights, including by:</Typography>
        <ul>
            <li>Denying goods or services to You</li>
            <li>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
            <li>Providing a different level or quality of goods or services to You</li>
            <li>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
        </ul>
    </li>
</ul>
</Typography>

<Typography variant='h4'>Exercising Your CCPA Data Protection Rights</Typography>
<Typography variant='body2'>In order to exercise any of Your rights under the CCPA, and if you are a California resident, You can email or call us or visit our "Do Not Sell My Personal Information" section or web page.</Typography>
<Typography variant='body2'>The Company will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.</Typography>

<Typography variant='h4'>Do Not Sell My Personal Information</Typography>
<Typography variant='body2'>We do not sell personal information. However, the Service Providers we partner with (for example, our advertising partners) may use technology on the Service that "sells" personal information as defined by the CCPA law.</Typography>
<Typography variant='body2'>If you wish to opt out of the use of your personal information for interest-based advertising purposes and these potential sales as defined under CCPA law, you may do so by following the instructions below.</Typography>
<Typography variant='body2'>Please note that any opt out is specific to the browser You use. You may need to opt out on every browser that you use.</Typography>

<Typography variant='h5'>Website</Typography>
<Typography variant='body2'>You can opt out of receiving ads that are personalized as served by our Service Providers by following our instructions presented on the Service:</Typography>
<Typography variant='body2'>
<ul>
  <li>From Our "Cookie Consent" notice banner</li>
  <li>Or from Our "CCPA Opt-out" notice banner</li>
  <li>Or from Our "Do Not Sell My Personal Information" notice banner</li>
  <li>Or from Our "Do Not Sell My Personal Information" link</li>
</ul>
</Typography>
<Typography variant='body2'>The opt out will place a cookie on Your computer that is unique to the browser You use to opt out. If you change browsers or delete the cookies saved by your browser, you will need to opt out again.</Typography>

<Typography variant='h5'>Mobile Devices</Typography>
<Typography variant='body2'>Your mobile device may give you the ability to opt out of the use of information about the apps you use in order to serve you ads that are targeted to your interests:</Typography>
<Typography variant='body2'>
<ul>
  <li>"Opt out of Interest-Based Ads" or "Opt out of Ads Personalization" on Android devices</li>
  <li>"Limit Ad Tracking" on iOS devices</li>
</ul>
</Typography>
<Typography variant='body2'>You can also stop the collection of location information from Your mobile device by changing the preferences on your mobile device.</Typography>

<Typography variant='h3'>"Do Not Track" Policy as Required by California Online Privacy Protection Act (CalOPPA)</Typography>
<Typography variant='body2'>Our Service does not respond to Do Not Track signals.</Typography>
<Typography variant='body2'>However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.</Typography>

<Typography variant='h3'>Children's Privacy</Typography>
<Typography variant='body2'>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</Typography>
<Typography variant='body2'>We also may limit how We collect, use, and store some of the information of Users between 13 and 18 years old. In some cases, this means We will be unable to provide certain functionality of the Service to these users.</Typography>
<Typography variant='body2'>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</Typography>

<Typography variant='h3'>Your California Privacy Rights (California Business and Professions Code Section 22581)</Typography>
<Typography variant='body2'>California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.</Typography>
<Typography variant='body2'>To request removal of such data, and if you are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.</Typography>
<Typography variant='body2'>Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.</Typography>

<Typography variant='h3'>Links to Other Websites</Typography>
<Typography variant='body2'>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</Typography>
<Typography variant='body2'>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Typography>

<Typography variant='h3'>Changes to this Privacy Policy</Typography>
<Typography variant='body2'>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</Typography>
<Typography variant='body2'>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</Typography>
<Typography variant='body2'>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Typography>

<Typography variant='h3'>Contact Us</Typography>
<Typography variant='body2'>If you have any questions about this Privacy Policy, You can contact us:</Typography>
<Typography variant='body2'>
<ul>
    <li>By email: contact@nookhorizons.com</li>
</ul>
</Typography>
        </div>
        </div>
    )
}

export default Privacy;
