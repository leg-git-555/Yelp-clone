import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkGetBusinesses } from "../../redux/businesses"
import { thunkGetReviews } from "../../redux/reviews"
import './Business.css'

export function Business() {
    const { bizId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //get current user
    const user = useSelector(state => state.session.user)

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

    //check if user is owner of the current biz
    let ownerBool;
    if (biz?.owner_id === user?.id) ownerBool = true

    //check if user has already written a review
    let reviewBool;

    for (let review of curr_reviews) {
        if (review?.owner_id === user?.id) reviewBool = true
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
            {!ownerBool && !reviewBool &&
                <button className="post-review-button" onClick={() => navigate(`/businesses/${bizId}/reviews/new`)}>Post a review +</button>
            }
            <div className="reviews-container">
                {curr_reviews.map(review =>
                    <div className="review-card" key={review.id}>
                        <div>
                            {review.review}
                            {review?.owner_id === user?.id &&
                                <div>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        return navigate(`/businesses/${bizId}/reviews/${review.id}/edit`)
                                    }}>update</button>
                                    <button>delete</button>
                                </div>
                            }
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}