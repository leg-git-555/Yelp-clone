import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { thunkGetBusinesses } from "../../redux/businesses"

export function Homepage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    let businesses = useSelector(state => state.businesses)
    businesses = businesses.businesses
    // console.log(user)
    let bizRay = []
    for (let biz in businesses) {
        bizRay.push(businesses[biz])
    }
    // console.log(bizRay)
    // console.log(businesses)


    useEffect(() => {
        dispatch(thunkGetBusinesses())
    }, [dispatch, user])

    return (
        <div>
            {user ?
                <div className="biz-container">
                    {bizRay.map(biz => (
                        <div title={biz.name} className="biz-card" key={biz.id}>
                            <div>{biz.name}</div>
                            <div className="biz-card-image-container">
                                <img src={biz.image_url}></img>
                            </div>
                        </div>
                    ))} 
                </div> :
                <div>
                    login using the button on the top right!
                </div>
            }
        </div>
    )
}