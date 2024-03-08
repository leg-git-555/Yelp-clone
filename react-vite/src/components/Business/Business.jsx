import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkGetBusinesses } from "../../redux/businesses"
import { thunkGetReviews } from "../../redux/reviews"
import { thunkGetUsers } from "../../redux/users"
import './Business.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { DeleteReview } from "../DeleteReviewModal/DeleteReview"
import { FaDollarSign } from "react-icons/fa";
import { LuDot } from "react-icons/lu";


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

    //get all users (needed to add profile pic to review)
    const users = useSelector(state => state.users)
    console.log(users[1])

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
        dispatch(thunkGetUsers())
    }, [dispatch])

    // console.log(typeof(biz?.price))

    return (
        <div>
            <div className="single-biz-container">
                <div className="single-biz-img-container">
                    <img src={biz?.image_url}></img>
                </div>
                <div>
                    <h1>{biz?.name}</h1>
                    <p>{`${biz?.address}, ${biz?.city}, ${biz?.state}`}</p>
                    <div className="category-dollar-container">
                        <div>{`${biz?.category}`}</div>
                        <LuDot />
                        {biz?.price === 1 && <FaDollarSign />}
                        {biz?.price === 2 &&
                            <div>
                                <FaDollarSign />
                                <FaDollarSign />
                            </div>}
                        {biz?.price === 3 &&
                            <div>
                                <FaDollarSign />
                                <FaDollarSign />
                                <FaDollarSign />
                            </div>}
                    </div>
                </div>
            </div>
            <h3 className="review-break">Reviews</h3>
            {!ownerBool && !reviewBool &&
                <button className="post-review-button" onClick={() => navigate(`/businesses/${bizId}/reviews/new`)}>Post a review +</button>
            }
            <div className="reviews-container">
                {curr_reviews.map(review =>
                    <div className="review-card" key={review.id}>
                        <div className="review-poster-container">
                            <img src={users[`${review?.owner_id}`]?.profile_image_url}></img>
                            <div>
                                <div className="poster-name">
                                {users[`${review?.owner_id}`]?.first_name}
                                </div>
                                
                                <div>{review?.rating}</div>
                                
                            </div>
                        </div>
                        <div>
                            {review.review}
                            {review?.owner_id === user?.id &&
                                <div>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        return navigate(`/businesses/${bizId}/reviews/${review.id}/edit`)
                                    }}>update</button>
                                    <button>
                                        <OpenModalMenuItem
                                            modalComponent={<DeleteReview id={review.id} />}
                                            itemText="Delete"
                                        />
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}