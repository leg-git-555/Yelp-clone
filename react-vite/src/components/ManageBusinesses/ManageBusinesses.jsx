import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { thunkGetCurrentBusinesses } from "../../redux/currentBusinesses"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { DeleteBusiness } from "../DeleteBusinessModal/DeleteBusiness"


export function ManageBusinesses() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const user = useSelector(state => state.session.user)
    const currentBusinesses = useSelector(state => state.currentBusinesses)
    let bizRay = []

    for (let biz in currentBusinesses) {
        bizRay.push(currentBusinesses[biz])
    }
   
    useEffect(() => {
        dispatch(thunkGetCurrentBusinesses())
    }, [dispatch])

    return (
        <div>
            <h1>Manage your businesses</h1>
            <div className="biz-container">
                    {bizRay.map(biz => (
                        <div title={biz.name} className="biz-card" key={biz.id}>
                            <div>{biz.name}</div>
                            <div className="biz-card-image-container">
                                <img src={biz.image_url}></img>
                            </div>
                            <div className="biz-card-button-container">
                                <button
                                onClick={e => {
                                    e.stopPropagation()
                                    return navigate(`/businesses/${biz.id}/edit`)
                                }}
                                >
                                    udpate
                                </button>
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <OpenModalMenuItem 
                                        modalComponent={<DeleteBusiness id={biz.id} />}
                                        itemText="Delete"
                                    />
                                </button>
                                
                            </div>
                        </div>
                    ))} 
                </div>

        </div>
    )
}