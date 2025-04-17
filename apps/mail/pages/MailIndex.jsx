const { useEffect, useState } = React
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'

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

    function onRemoveMail(mailId) {
        // setIsLoading(true)
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                // showSuccessMsg(`Car (${carId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing mail:', err)
                // showErrorMsg('Problem removing car!')
            })
            // .finally(() => setIsLoading(false))
    }

    return (
        <section className="mail-index">
            <MailFilter onSetFilter={onSetTxtFilter} />
            <MailFolderList onSetFilter={onSetFolder} />
            <h2>{filterBy.status}</h2>
            <MailList mails={mails} onRemoveMail={onRemoveMail}/>
        </section>
    )
}