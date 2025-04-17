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


  return (
    <section>
        <button onClick={onBack}>back</button>
        <button onClick={onDeleteMail}>delete</button>
        <h1>{mail.subject}</h1>
        <p>{mail.from}</p>
        <p>{mail.body}</p>
    </section>
  )
}



