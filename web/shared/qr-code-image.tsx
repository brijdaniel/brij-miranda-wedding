import React from 'react';
import { toDataURL } from 'qrcode'

export function QrCodeImage({ url }) {
    const [qrImgUrl, setQrImgUrl] = React.useState('none');

    React.useEffect(() => {
        if (!url) {
            return;
        }
        toDataURL(url, function (err, dataUrl) {
            setQrImgUrl(dataUrl);
        });
    }, [url])

    return qrImgUrl && <img width={120} src={qrImgUrl} />
}
