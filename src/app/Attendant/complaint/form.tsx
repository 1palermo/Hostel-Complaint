import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import convertToBase64 from '../../Base64';
import axios from 'axios';

interface FormData {
   text: string;
   image: string;
}

export default function Form(props: { id: string, attended: string }) {
    const [formData, setFormData] = useState<FormData>({
        text: '',
        image: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, text: e.target.value });
    };

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check image size
            if (file.size > 100 * 1024) { // 100kb in bytes
                alert('Please select an image less than 100kb.');
                return;
            }

            // Convert image to base64
            const base64 = await convertToBase64(file);
            setFormData({ ...formData, image: base64 });
        }
    };

    const handleSolved = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("customToken");
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=Solved&Id=${props.id}`, { data: formData, userToken: token });
            console.log(response.data);
            setShowConfirmation(true);
            setFormData({
                text: '',
                image: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    }

    const handleAttended = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("customToken");
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=Attended&Id=${props.id}`, { data: formData, userToken: token });
            console.log(response.data);
            setShowConfirmation(true);
            setFormData({
                text: '',
                image: ''
            });
        } catch (error) {
            console.error('Error:', error);
            alert("error in submitting");
        }

        setLoading(false);
    }

    return (
        <>
            <br />
            <hr />
            <br />
            <h1 className="font-bold mb-4 w-full text-center text-2xl text-green-600">Enter Your Response</h1>
            {
                props.attended === "Unattended" ?
                    <form className="w-3/4 lg:w-2/4 mx-auto mt-8 p-4 bg-green-100 rounded-md" onSubmit={handleAttended}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                value={formData.text}
                                onChange={handleTextChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                Upload Image
                            </label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="file"
                                accept="image/jpg image/jpeg"
                                onChange={handleImageChange}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-700"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center pt-10">
                        <button
                            type="submit"
                            className="bg-green-600 text-xl text-white p-2 rounded-md text-center w-full"
                            disabled={loading} // Disable the button when loading
                        >
                            {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>
                            ) : (
                            "Attended"
                            )}
                        </button>
                        </div>
                    </form> :
                    <form className="w-3/4 mx-auto mt-8 p-4 bg-gray-100" onSubmit={handleSolved}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 pl-2">Description</label>
                            <input
                                type="text"
                                value={formData.text}
                                onChange={handleTextChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 pl-2">
                                Upload Image
                            </label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="file"
                                accept="image/jpg image/jpeg"
                                onChange={handleImageChange}
                                className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-700"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-center pt-10">
                        <button
                            type="submit"
                            className="bg-green-600 text-xl text-white p-2 rounded-md text-center w-full"
                            disabled={loading} // Disable the button when loading
                        >
                            {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>
                            ) : (
                            "Solved"
                            )}
                        </button>
                        </div>
                    </form>
            }


            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p >Form submitted successfully!</p>
                        <Link href="/Attendant" passHref>
                            <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={() => window.location.href = "/Attendant"}>Yes</button>
                        </Link>
                    </div>
                </div>
            )}
            <br />
        </>
    );
}
