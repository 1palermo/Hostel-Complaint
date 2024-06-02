// pages/report.tsx
"use client";
import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faMultiply } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Base64 from "../../Base64";
import Navbar from "@/app/components/navbar";
import axios from "axios";

interface FormDetails {
  title: string;
  issue: string;
  department: string;
  desc: string;
  image: string;
}
const ReportPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formD, setForm] = useState<FormDetails>({
    title: "",
    issue: "Wifi not working",
    department: "computer centre",
    desc: "",
    image: "",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleFormChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "issue") {
      if (value === "wifi Not working") {
        setForm((prevForm) => ({
          ...prevForm,
          department: "computer centre",
        }));
      } else if (value === "Electrical issues") {
        setForm((prevForm) => ({
          ...prevForm,
          department: "electrical department",
        }));
      } else if (value === "Civil issues") {
        setForm((prevForm) => ({
          ...prevForm,
          department: "civil department",
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          department: "hostel office",
        }));
      }
    }
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const base64 = await Base64(file);
    if (e.target.files && e.target.files[0]) {
      setForm({ ...formD, image: base64 });
    }
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        console.log('File selected:', file);
        // Check image size
        if (file.size > 100 * 1024) { // 100kb in bytes
            console.log('File size exceeds 100KB:', file.size);
            alert('Please select an image less than 100kb.');
            return;
        }

        try {
            // Convert image to base64
            const base64 = await Base64(file);
            setForm({ ...formD, image: base64 });
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
    } else {
        console.log('No file selected');
    }
};

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/submitReport`,
        { data: formD },
        {
          validateStatus: (status) => status >= 200 && status <= 500,
        }
      )
      .then((data) => {
        setLoading(false);
        alert("submitted sucessfully!")
      })
      .catch((error) => {
        alert("error while submitting!")
        console.log(error);
      });
    // const result= await response.json();
    setForm({
      title: "",
      issue: "Wifi not working",
      department: "civil department",
      desc: "",
      image: "",
    });
    return;
  }

  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/dtuLogo.svg')] bg-cover">
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 p-8 rounded-lg shadow-md w-[720px]">
        <Navbar />
        <div className="py-5"></div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-600"
            >
              Issue Type
            </label>
            <select
              id="issue"
              name="issue"
              onChange={handleFormChange}
              value={formD.issue}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
            >
              <option value="wifi Not working">Internet Issues</option>
              <option value="Electrical issues">Electrical issues</option>
              <option value="Civil issues">Civil issues</option>
              <option value="Mess issues">Mess issues</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-600"
            >
              Department
            </label>
            <div>{formD.department}</div>
            {/* <select
              id="issue"
              name="department"
              onChange={handleFormChange}
              value={formD.department}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
            >
              <option value="civil department">Civil Department</option>
              <option value="electrical department">
                Electrical Department
              </option>
              <option value="computer centre">Computer Center</option>
              <option value="hostel office">Hostel Office</option>
            </select> */}
          </div>

          <div>
            <label
              htmlFor="reportTitle"
              className="block text-sm font-medium text-gray-600"
            >
              Report Title
            </label>
            <input
              type="text"
              id="reportTitle"
              name="title"
              placeholder="Enter Report Title"
              onChange={handleFormChange}
              value={formD.title}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
            />
          </div>

          <div>
            <label
              htmlFor="briefProblem"
              className="block text-sm font-medium text-gray-600"
            >
              Brief of Problem
            </label>
            <textarea
              id="briefProblem"
              name="desc"
              placeholder="Your problem"
              onChange={handleFormChange}
              value={formD.desc}
              rows={5}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
            />
          </div>

          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-600"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
            />
          </div>
          <div className="flex items-center justify-center pt-10">
            <button
                type="submit"
                className="bg-green-600 text-white font-bold p-3 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
                disabled={loading} // Disable the button when loading
            >
                {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
                ) : (
                "Submit"
                )}
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
