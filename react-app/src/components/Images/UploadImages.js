// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";


// const UploadPicture = () => {
//     const history = useHistory(); // so that we can redirect after the image upload is successful
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image);

//         // aws uploads can be a bit slow—displaying
//         // some sort of loading message is a good idea
//         setImageLoading(true);

//         const res = await fetch('/api/images/', {
//             method: "POST",
//             body: formData,
//         });
//         if (res.ok) {
//             await res.json();
//             setImageLoading(false);
//             history.push("/images");
//         }
//         else {
//             setImageLoading(false);
//             // a real app would probably use more advanced
//             // error handling
//             console.log("error");
//         }
//     }

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//     }

//     return (


//         <form onSubmit={handleSubmit} enctype="multipart/form-data">
//             <label for="user_file">Upload Your File</label>
//             <input
//                 type="file"
//                 name="user_file"
//                 accept="image/*"
//                 onChange={updateImage}
//             />

//              <div className="button-container" >
//                 <button className="create-post-button" type="submit">Upload Image</button>
//                 {(imageLoading) && <p>Loading...</p>}
//             </div>
//         </form>
//     )
// }

// export default UploadPicture;
