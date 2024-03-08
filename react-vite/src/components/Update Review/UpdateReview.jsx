import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkGetReviews } from "../../redux/reviews"
import ReactStars from 'react-rating-stars-component'
import { csrfFetch } from "../../redux/csrf"


export function UpdateReview() {
    const {bizId, reviewId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    
    const [imageOne, setImageOne] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [imageThree, setImageThree] = useState('')

    const [imageOneError, setImageOneError] = useState('')
    const [imageTwoError, setImageTwoError] = useState('')
    const [imageThreeError, setImageThreeError] = useState('')

    const [validations, setValidations] = useState('')
    const [submitBool, setSubmitBool] = useState(false)

    //get current review
    const reviews = useSelector(state => state.reviews)
    const curr_review = reviews[reviewId]

    useEffect(() => {
        dispatch(thunkGetReviews())
    }, [dispatch])

    //pre-populate form
    useEffect(() => {
        if (curr_review?.review) setReview(curr_review.review)
        if (curr_review?.rating) setRating(curr_review.rating)
    }, [curr_review])

    //form validations
    useEffect(() => {
        let errorObj = {}
        if (review.length < 80 || review.length > 1000) errorObj.review = 'Review must have between 80 and 1000 characters'
        if (rating.length === 0) errorObj.rating = 'Rating is required'
        if (imageOneError.length > 0) errorObj.imageOne = imageOneError
        if (imageTwoError.length > 0) errorObj.imageTwo = imageTwoError
        if (imageThreeError.length > 0) errorObj.imageThree = imageThreeError

        setValidations(errorObj)
    }, [setValidations, review, rating, imageOneError, imageTwoError, imageThreeError])

    
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitBool(true)

        if (Object.keys(validations).length > 0) {
            // console.log('errors')
            return
        } else {
            // console.log('all set', review, rating)
            let formDataOne = new FormData()

            formDataOne.append("review", review)
            formDataOne.append("rating", rating)

            try {
                let res = await csrfFetch(`/api/reviews/${reviewId}`, {
                    method: "PUT",
                    body: formDataOne
                })

                navigate(`/businesses/${bizId}`)

            } catch (e) {
                console.log('in catch', e)
                // let trueE = await e.json()
                // console.log(trueE)
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
            <h2>Update your review</h2>
            <textarea
                value={review}
                placeholder="Write your review here..."
                onChange={(e) => setReview(e.target.value)}
            />
            {submitBool && validations.review && <p className='validation-error'>{validations.review}</p>}

            {rating && 
            <ReactStars 
                // rating={rating}
                value={rating}
                count={5}
                size={50}
                edit={true}
                onChange={ratingChanged}
            />}
            {submitBool && validations.rating && <p className='validation-error'>{validations.rating}</p>}
            <label>
                Image one
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const size = e.target.files[0].size;
                        if (size > 10 ** 6) setImageOneError("File size must be under 10 MB");
                        else setImageOneError("")
                        setImageOne(e.target.files[0]);
                    }}
                />
            </label>
            {submitBool && validations.imageOne && <p className='validation-error'>{validations.imageOne}</p>}
            <label>
                Image two
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const size = e.target.files[0].size;
                        if (size > 10 ** 6) setImageTwoError("File size must be under 10 MB");
                        else setImageTwoError("")
                        setImageTwo(e.target.files[0]);
                    }}
                />
            </label>
            {submitBool && validations.imageTwo && <p className='validation-error'>{validations.imageTwo}</p>}
            <label>
                Image three
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const size = e.target.files[0].size;
                        if (size > 10 ** 6) setImageThreeError("File size must be under 10 MB");
                        else setImageThreeError("")
                        setImageThree(e.target.files[0]);
                    }}
                />
            </label>
            {submitBool && validations.imageThree && <p className='validation-error'>{validations.imageThree}</p>}


            <button
                type="submit"
            >
                Post Review
            </button>
        </form>
    </div>
    )
}