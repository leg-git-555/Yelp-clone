import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkGetCurrentBusinesses } from "../../redux/currentBusinesses"
import { csrfFetch } from "../../redux/csrf"

export function UpdateBusiness() {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const [imageSizeE, setImageSizeE] = useState('')

    const [validations, setValidations] = useState('')
    const [submitBool, setSubmitBool] = useState(false)

    //get current biz from state. dont forget '?' or your app will break!
    const biz = useSelector(state => state.currentBusinesses[id])

    useEffect(() => {
        dispatch(thunkGetCurrentBusinesses())
    }, [dispatch])

    useEffect(() => {
        if (biz?.name) setName(biz?.name)
        if (biz?.address) setAddress(biz?.address)
        if (biz?.city) setCity(biz?.city)
        if (biz?.state) setState(biz?.state)
        if (biz?.country) setCountry(biz?.country)
        if (biz?.category) setCategory(biz?.category)
        if (biz?.price) setPrice(biz?.price)
    }, [biz])

    useEffect(() => {
        let errorObj = {}

        if (name.length === 0 || name.length > 50) errorObj.name = 'Name field must have between 1 and 50 characters'
        if (address.length < 4 || address.length > 40) errorObj.address = 'Address field must have between 4 and 40 characters'
        if (city.length === 0 || city.length > 30) errorObj.city = 'City field must have between 1 and 30 characters'
        if (state.length === 0 || state.length > 13) errorObj.state = 'State field must have between 1 and 13 characters'
        if (country.length === 0 || country.length > 30) errorObj.country = 'Country field must have between 1 and 30 characters'
        if (category.length === 0) errorObj.category = 'Dining category cannot be blank'
        if (price.length === 0) errorObj.price = 'Price cannot be blank'
        if (imageSizeE.length > 0) errorObj.image = imageSizeE

        setValidations(errorObj)
    }, [setValidations, name, address, city, state, country, category, price, imageSizeE])

    // console.log(image)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitBool(true)

            if (Object.keys(validations).length > 0) {
                console.log('uhoh, errors')
                return 
            } else {
                let formData = new FormData()

                formData.append("name", name)
                formData.append("address", address)
                formData.append("city", city)
                formData.append("state", state)
                formData.append("country", country)
                formData.append("category", category)
                formData.append("price", +price)

                if (image) formData.append("image_url", image)

                let res = await csrfFetch(`/api/businesses/${id}`, {
                    method: "PUT",
                    body: formData 
                })

                    if (res.ok) {
                        navigate('/businesses/current')
                    } else {
                        return
                        //do something with errors 
                    }

            }


    }

    return (
        <div className="create-business-form-container">
            <form
                className="create-business-form"
                encType="multipart/form-data"
                onSubmit={e => handleSubmit(e)}
            >
                <h2>Edit Your Business</h2>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {submitBool && validations.name && <p className='validation-error'>{validations.name}</p>}
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                {submitBool && validations.address && <p className='validation-error'>{validations.address}</p>}
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                {submitBool && validations.city && <p className='validation-error'>{validations.city}</p>}
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                {submitBool && validations.state && <p className='validation-error'>{validations.state}</p>}
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                {submitBool && validations.country && <p className='validation-error'>{validations.country}</p>}
                <label>
                    Dining Category
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="fast food">Fast Food</option>
                        <option value="fast casual">Fast Casual</option>
                        <option value="fine dining">Fine Dining</option>

                    </select>
                </label>
                {submitBool && validations.category && <p className='validation-error'>{validations.category}</p>}
                <label>
                    Price
                    <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    >
                        <option value="">Select a Price</option>
                        <option value="1">low</option>
                        <option value="2">medium</option>
                        <option value="3">high</option>

                    </select>
                </label>
                {submitBool && validations.price && <p className='validation-error'>{validations.price}</p>}
                <label>
                    Business Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            const size = e.target.files[0]?.size;
                            if (size > 10 ** 6) setImageSizeE("File size must be under 10 MB");
                            else setImageSizeE("")
                            setImage(e.target.files[0]);
                        }}
                    />
                </label>
                {submitBool && validations.image && <p className='validation-error'>{validations.image}</p>}
                <button
                    type="submit"
                >
                    Update Business
                </button>
            </form>

        </div>
    )
}