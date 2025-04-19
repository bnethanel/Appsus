const { useEffect, useState } = React
const { Outlet } = ReactRouterDOM
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

    function onSetFilter(updatedFilter) {
        setFilterBy(prev => ({ ...prev, ...updatedFilter }))
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
        <section className="flex">
            <MailFolderList onSetFilter={status => onSetFilter({ status })} selectedFolder={filterBy.status} />
    
            <section className="flex column mail-main">
                <MailFilter onSetFilter={onSetFilter} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} isReadFilter={filterBy.isRead} />
            </section>
            <Outlet />
        </section>
    )
}