import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { csrfFetch } from "../../redux/csrf"
import { actionDeleteReview } from "../../redux/reviews"

export function DeleteReview({id}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    async function deleteReview() {
        await csrfFetch(`/api/reviews/${id}`, {
            method: 'DELETE'
        })
        dispatch(actionDeleteReview(id))

        closeModal()
    }


    return (
        <div>
            <p>Are you sure you want to delete your review?</p>
            <div className="yes-no-button-container">
                <button className="delete-button" onClick={() => deleteReview()}>Yes (Delete review)</button>
                <button className="keep-button" onClick={() => closeModal()}>No (Keep review)</button>
            </div>
        </div>
    )
}