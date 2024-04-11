import React, { useState } from 'react';

const Qrcode = () => {
    const [image, setImage] = useState("images/qrcode.png");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrdata] = useState("");
    const [size, setSize] = useState("");

    const generateQR = async () => {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
            setImage(url);
        } catch (error) {
            console.error("Error generating QR CODE", error);
        } finally {
            setLoading(false);
        }
    }

    const downloadQR = () => {
        fetch(image)
            .then((res) => res.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "QR code-download.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.log("Error in downloading the QR CODE", err);
            });
    }

    return (
        <div className="bg-cover bg-bottom bg-no-repeat  h-screen w-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('https://th.bing.com/th/id/R.c014717fab70a24e40e04fcdd804d297?rik=aR4ip6m4b2PYmQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f09%2fImage-of-All-White.png&ehk=FdnK1VgNjSXx4VNFW49JZU5Z8Nw2HbFtgEzUW3O5WzQ%3d&risl=&pid=ImgRaw&r=0')" }}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white" >
        <h1 className="text-3xl font-bold mb-8 title-font">QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {image && <img src={image} alt="QR Code" className="rounded-lg shadow-lg mb-8" />}
        <div className="flex flex-col my-custom-font space-y-4">
            <label htmlFor="dataInput" className="text-lg">Data for generating QR code</label>
            <input
                type="text"
                value={qrData}
                onChange={(e) => setQrdata(e.target.value)}
                id="dataInput"
                className="border rounded-md p-2"
                placeholder="Enter data"
            />
            <label htmlFor="sizeInput" className="text-lg">Image Size (e.g., 150)</label>
            <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                id="sizeInput"
                className="border rounded-md p-2"
                placeholder="Enter image size"
            />
            <button onClick={generateQR} disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none">
                Generate QR CODE
            </button>
            <button onClick={downloadQR} disabled={loading} className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none">
                Download
            </button>
        </div>
    </div>
    </div>
);
}


export default Qrcode;
