import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { extensionOk } from "../../utils/helpers";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageSizeError, setImageSizeError] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const [validations, setValidations] = useState({})
  const [submitBool, setSubmitBool] = useState(false)

  useEffect(() => {
    let errorObj = {}

    if (firstName.length < 2 || firstName.length > 20) errorObj.firstName = 'First name must be between 2 and 20 characters'
    if (lastName.length < 2 || lastName.length > 20) errorObj.lastName = 'Last name must be between 2 and 20 characters'
    if (!email.includes('@') || !email.includes('.')) errorObj.email = 'Please provide a valid email address'
    if (imageSizeError.length > 0) errorObj.imageSizeError = imageSizeError
    if (profileImageUrl) {
      if (!extensionOk(profileImageUrl.name)) errorObj.imageTypeError = 'File type must be .png, .jpg, or .jpeg'
    }
    if (password.length < 6) errorObj.password = 'Password must be at least 6 characters'

    setValidations(errorObj)
  }, [setValidations, firstName, lastName, email, imageSizeError, profileImageUrl, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBool(true)

    if (Object.keys(validations).length > 0) {
      return
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        "first_name": firstName,
        "last_name": lastName,
        "profile_image_url": profileImageUrl,
        email,
        username,
        password,
      })
    );

    // console.log(serverResponse)
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          <div>
            First Name
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {submitBool && validations.firstName && <p className='validation-error'>{validations.firstName}</p>}
        <label>
          <div>
            Last Name
          </div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {submitBool && validations.lastName && <p className='validation-error'>{validations.lastName}</p>}
        <label>
          <div>
            Email
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="validation-error">{errors.email}</p>}
        {submitBool && validations.email && <p className='validation-error'>{validations.email}</p>}
        <label>
          <div>
            Username
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="validation-error">{errors.username}</p>}
        <label>
          <div>
            Profile Image
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const size = e.target.files[0].size;

              if (size > 10 ** 6) return setImageSizeError("File size must not be larger than 10MB.");
              setProfileImageUrl(e.target.files[0]);
              setImageSizeError("")
              // if (size > 10 ** 6) return setErrors({ profileImageUrl: "File size must not be larger than 10MB." });
              // setProfileImageUrl(e.target.files[0]);
              // setErrors({ profileImageUrl: "" });
            }}
          />
        </label>
        {submitBool && validations.imageSizeError && <p className='validation-error'>{validations.imageSizeError}</p>}
        {submitBool && validations.imageTypeError && <p className='validation-error'>{validations.imageTypeError}</p>}
        {/* {errors.profileImageUrl && <p className="validation-error">{errors.profileImageUrl}</p>} */}
        <label>
          <div>
            Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="validation-error">{errors.password}</p>}
        {submitBool && validations.password && <p className='validation-error'>{validations.password}</p>}
        <label>
          <div>
            Confirm Password
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="validation-error">{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
