import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetBusinesses } from "../../redux/businesses"
import { thunkGetReviews } from "../../redux/reviews"
import './Business.css'

export function Business() {
    const {bizId} = useParams()
    const dispatch = useDispatch()

    //get current user
    const user = useSelector(state => state.session.user)
    console.log('woooooo', user)
    //get current biz
    const businesses = useSelector(state => state.businesses.businesses)
    const biz = businesses[bizId]

    //get current reviews
    const reviews = useSelector(state => state.reviews)
    let curr_reviews = []
  

        for (let id in reviews) {
            //find current reviews
            if (reviews[id].business_id === +bizId) {
                curr_reviews.push(reviews[id])
            }
        }

    useEffect(() => {
        dispatch(thunkGetBusinesses())
        dispatch(thunkGetReviews())
    }, [dispatch])

    return (
        <div>
            <div className="single-biz-container">
                <h1>{biz?.name}</h1>
                <img src={biz?.image_url}></img>
            </div>
            <div className="review-break">Reviews</div>
            <div className="reviews-container">
                {curr_reviews.map(review => 
                    <div className="review-card" key={review.id}>
                        {review.review}
                    </div>
                    
                    )}
            </div>
        </div>
    )
}