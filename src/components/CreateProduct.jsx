import { useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";


const CreateProductForm = () => {


  const baseUrl = import.meta.env.VITE_API_URL;

  // const baseUrl = "http://localhost:3000";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading,setLoading]=useState(false)

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!imageUrl) newErrors.image = "Image is required";
    return newErrors;
  };

  const createProducts = async (url, data) => {
    try {
      const response = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "image") {
      handleImageChange(files[0], e);
    } else {
      handleTextChange(id, value);
    }
  };

  const handleImageChange = (imageFile, e) => {
    if (
      imageFile &&
      (imageFile.type === "image/png" || imageFile.type === "image/jpeg") &&
      imageFile.size <= 5000000
    ) {
      // setLoading(true)
      const readFile = new FileReader();
      readFile.readAsDataURL(imageFile);
      readFile.onloadend = () => {
        setImageUrl(readFile.result);
        setErrors((prevErrors) => ({ ...prevErrors, image: null }));
        // setLoading(false)
      };
    } else {
      e.target.value = null;
      setImageUrl("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Invalid file type or size",
      }));
    }
  };

  const handleTextChange = (id, value) => {
    if (id === "name") {
      setName(value);
      if (value) setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    } else if (id === "description") {
      setDescription(value);
      if (value)
        setErrors((prevErrors) => ({ ...prevErrors, description: null }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      name,
      description,
      image: imageUrl,
    };
    setLoading(true)
    console.log("Form data: ", productData); // log the form data

    const response = await createProducts(baseUrl, productData);
    setLoading(false)
    

    if (response?.message) {
      toast.success(response.message, {
        position: 'top-center',
        autoClose: 5000,
        closeOnClick: true,
      });
      // setMessage(response.message);
    } else {
      toast.error('Failed to create product. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        closeOnClick: true,
      });
    }

    // Reset the image URL
    setImageUrl("");

    // Clear the form
    e.target.reset();
    setName("");
    setDescription("");
    setErrors({});
   
  };

  return (
    <>
  
      <>
        <h1 className="mb-12 text-center text-3xl font-bold uppercase text-primary">
          Add a Product
        </h1>
        {/* {message && (
          <p className="mt-3 text-xs font-bold text-green-500">{message}</p>
        )} */}
      </>

      <form onSubmit={handleFormSubmit} className="m-x-auto w-full ">
        <div className="flex flex-col gap-10 sm:flex-row lg:gap-16">
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Enter description"
                rows={3}
                value={description}
                onChange={handleChange}></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
        

          <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        {loading && (
                <div className="mt-[-2.5rem] flex justify-center">
                  <ImSpinner9 className="animate-spin text-4xl text-primary" />
                </div>
              )}
          </div>


          <div className="lg:w-1/2  bg-white" >
            <div className="form-control w-full   ">
              <label className="label" htmlFor="image">
                <span className="label-text mb-3 ">Upload an Image:</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input w-full max-w-xs"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg, image/gif"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
            </div>
          
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded Preview"
                className="mt-3 w-full max-w-xs"
              />
            )}
          </div>
        </div>
      
      </form>
    </>
  );
};

export default CreateProductForm;