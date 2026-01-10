import Header from "../components/Header";

function Contact() {
    return (
        <div>
            <Header label="Contact Us" />
            <div className="p-5">
                <p className="text-sm text-gray-600">If you have any complaints or issues regarding our services, please feel free to reach out to us via the email address below. We are committed to addressing your concerns promptly and ensuring your satisfaction.</p>
                <div className="mt-5 p-4 bg-gray-100 rounded-lg flex items-center gap-4">
                    <p className="text-sm font-medium text-gray-800">
                        customer@equinnoxtrading.com
                    </p>
                    <div className="w-full flex justify-center ">
                        <button 
                            className="cursor-pointer text-sm font-bold border-amber-500 border-2 p-2 rounded-xl bg-amber-500 text-white"
                            onClick={() => {
                                navigator.clipboard.writeText("customer@equinnoxtrading.com") ; 
                                alert("Email copied to clipboard!") ;}}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact

