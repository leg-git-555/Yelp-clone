import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { thunkGetBusinesses } from "../../redux/businesses"
import { useNavigate } from "react-router-dom"
import './Homepage.css'

export function Homepage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    let businesses = useSelector(state => state.businesses)
    businesses = businesses.businesses

    let bizRay = []
    for (let biz in businesses) {
        bizRay.push(businesses[biz])
    }

    useEffect(() => {
        dispatch(thunkGetBusinesses())
    }, [dispatch, user])

    return (
        <div>
            {user ?
                <div>
                    <h2>Your Next Review Awaits</h2>
                    <div className="biz-container">
                        {bizRay.map(biz => (
                            <div title={biz.name} className="biz-card" key={biz.id} onClick={() => navigate(`/businesses/${biz.id}`)} >
                                <div>{biz.name}</div>
                                <div className="biz-card-image-container">
                                    <img src={biz.image_url}></img>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="splash">
                    <h2>Welcome</h2>

                    <h3>
                        Yelpoli is a business-review site serving the greater Newark area.
                    </h3>
                    <h3>
                        Business owners can add their business's information, customers can leave reviews.
                    </h3>
                    <h3>
                        Get started by clicking the green user button at the top right of the page to login, signup, or test the site as a demo user.
                    </h3>
                    <h4>
                        Yelpoli is a wholly owned subsidiary of Barone Sanitation & Cartage Inc.
                    </h4>
                </div>
            }
        </div>
    )
}