import { VerifiedIcon } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Verification() {
    const [verified] = useState(false);
    const [inprocess, setinProcess] = useState(() => localStorage.getItem("verificationInProcess") === "true" ? true : false);
    const [documentType, setDocumentType] = useState("passport");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setUploadedFile(file);
    };

    return (
        <div>
            <Header label="Real Name Verification"/>
            {verified &&
                <div className="m-5 p-5 border-2 border-green-500 rounded-lg flex flex-row justify-start items-center gap-5">
                    <VerifiedIcon color="green" />
                    <div>
                        <h3 className="font-semibold text-green-600">Verified</h3>
                        <p className="text-sm text-gray-600">Your identity has been successfully verified.</p>
                    </div>
                </div>
            }
            {inprocess &&
                <div className="m-5 p-5 border-2 border-yellow-500 rounded-lg flex flex-row justify-start items-center gap-5">
                    <div className="w-5 h-5 border-4 border-yellow-500 border-t-transparent rounded-[60%] animate-spin"></div>
                    <div>
                        <h3 className="font-semibold text-yellow-600">Under Review</h3>
                        <p className="text-sm text-gray-600">Your identity verification is being processed.</p>
                    </div>
                </div>
            }
            {!verified && !inprocess &&
                <div className="m-5 p-5 border-2 border-gray-300 rounded-lg flex flex-col justify-start items-start gap-5">
                    <h3 className="font-semibold">Identity Verification Required</h3>
                    <p className="text-sm text-gray-600">To comply with regulations, please complete the identity verification process.</p>
                    <label className="text-sm font-medium text-gray-700">Document Type</label>
                    <select
                        value={documentType}
                        onChange={(event) => setDocumentType(event.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                        <option value="passport">Passport</option>
                        <option value="drivers_license">Driver's License</option>
                        <option value="national_id">National ID</option>
                        <option value="residence_permit">Residence Permit</option>
                    </select>
                    <label className="text-sm font-medium text-gray-700">Upload Document Photo</label>
                    <div className="w-full flex flex-col gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-sm text-red-500"
                        />
                        {uploadedFile &&
                            <p className="text-xs text-blue-500">{uploadedFile.name}</p>
                        }
                    </div>
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400" 
                        disabled={!uploadedFile}
                        onClick={() => setShowModal(true)}
                    >
                        Start Verification
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verification Submitted</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Your documents are under review. The verification process will be completed within 24 hours.
                                </p>
                                <button 
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                    onClick={() => {
                                        localStorage.setItem("verificationInProcess", "true");
                                        setinProcess(true);
                                        setShowModal(false);
                                        navigate("/terminal/users");
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Verification;

