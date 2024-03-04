import { useModal } from "../../context/Modal"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
import { csrfFetch } from "../../redux/csrf"
// import { thunkGetBusinesses } from "../../redux/businesses"
// import { thunkGetCurrentBusinesses } from "../../redux/currentBusinesses"

export function DeleteBusiness({ id }) {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {closeModal} = useModal()
    

    const deleteBiz = async () => {
        await csrfFetch(`/api/businesses/${id}`, {
            method: "DELETE"
        })

        //thought below would update businesses on page
        // dispatch(thunkGetBusinesses())
        // dispatch(thunkGetCurrentBusinesses())
        // navigate('businesses/current')
        closeModal()
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure that you want to delete this business?</p>
            <div className="yes-no-button-container">
                <button className="delete-button" onClick={() => deleteBiz()}>Yes (Delete Business)</button>
                <button className="keep-button" onClick={() => closeModal()}>No (Keep Business)</button>
            </div>
        </div>
    )
}