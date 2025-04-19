import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        // setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log('err:', err))
        // .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/mail')
        // navigate(-1)
    }

    function onDeleteMail() {
        mailService.remove(mail.id).then(() => navigate('/mail'))
    }

    if (!mail) return <div>Loading mail...</div>
    return (
        <section className="mail-details" >
            <button className="mail-details-back-btn" onClick={onBack}><i className="fa-solid fa-arrow-left "></i></button>
            <button className="mail-details-delete-btn" onClick={onDeleteMail}><i className="fa-solid fa-trash "></i></button>
            <div className="mail-details-content">
                <h1 className="mail-details-subject">{mail.subject}</h1>
                <p className="mail-details-from">From: {mail.from}</p>
                <p className="mail-details-body">{mail.body}</p>
            </div>
        </section>
    )
}



