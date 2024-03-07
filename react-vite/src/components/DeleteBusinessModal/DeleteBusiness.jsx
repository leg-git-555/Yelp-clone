import { useModal } from "../../context/Modal"
// import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { csrfFetch } from "../../redux/csrf"
import { actionDeleteACurrentBusiness } from "../../redux/currentBusinesses"
import {actionDeleteABusiness} from "../../redux/businesses"

export function DeleteBusiness({ id }) {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {closeModal} = useModal()
    

    const deleteBiz = async () => {
        await csrfFetch(`/api/businesses/${id}`, {
            method: "DELETE"
        })
        dispatch(actionDeleteACurrentBusiness(id))
        dispatch(actionDeleteABusiness(id))
        
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