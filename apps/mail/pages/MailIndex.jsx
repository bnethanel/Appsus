const { useEffect, useState } = React
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '' })

    useEffect(() => {
        mailService.query(filterBy).then(setMails)
    }, [filterBy])

    function onSetFolder(status) {
        setFilterBy(prev => ({ ...prev, status }))
    }

    function onSetTxtFilter(txt) {
        setFilterBy(prev => ({ ...prev, txt }))
    }

    return (
        <section className="mail-index">
            <MailFilter onSetFilter={onSetTxtFilter} />
            <MailFolderList onSetFilter={onSetFolder} />
            <h2>{filterBy.status}</h2>
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