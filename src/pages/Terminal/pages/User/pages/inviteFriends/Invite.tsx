import { useEffect, useState } from "react"
import { QRCodeSVG as QRCode } from "qrcode.react";
import Header from "../components/Header";

function Invite() {
    const [code, setCode] = useState("");

    useEffect(() => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setCode("https://example.com/invite?ref=" + randomCode);
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(code);
        alert("Invite link copied to clipboard!");
    };

    return (
        <div>
            <Header label="Invite Friends" />
            <div className="p-5">
                <p className="text-sm text-gray-600">Invite your friends to join our platform and earn rewards! Share the link below to get started.</p>
                <div className="flex justify-center">
                    <QRCode value={code} size={180} level="H" includeMargin={true} />
                </div>
                <div className="mt-5 p-3 border-2 border-dashed border-gray-300 rounded-lg flex flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">{code}</p>
                    <button
                        onClick={handleCopyLink}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                    >
                        Copy Link
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Invite

