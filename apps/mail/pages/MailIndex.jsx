const { useEffect, useState } = React
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query({ status: 'inbox' }).then(setMails)
    }, [])

    return (
        <section className="mail-index">
            <h2>Inbox</h2>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id}>
                        <h4>{mail.subject}</h4>
                        <p>{mail.body}</p>
                        <small>From: {mail.from}</small>
                    </li>
                ))}
            </ul>
        </section>
    )
}