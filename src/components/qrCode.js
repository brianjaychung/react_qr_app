import QRCode from "react-qr-code";
import { withLDConsumer } from "launchdarkly-react-client-sdk";

//app hosted in public S3 bucket
const QRURL = `ldsolutions.ldqrapp.org?clientsideid=${window.localStorage.getItem('CLIENTKEY')}`

console.log(process.env)
const qrCodeHome = ({ flags, ldClient /*, ...otherProps */ }) => {
  let showFeature = ldClient.variation("reactQRCode");
  
  return showFeature ? (
    <div>
      <br />
      <span><center>Scan me!</center></span>
      <div className="qr-wrapper">
        <QRCode value={QRURL} />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default withLDConsumer()(qrCodeHome);
