const { useEffect, useState } = React
const { Outlet, useLocation } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '' })
    const location = useLocation()

    useEffect(() => {
        mailService.query(filterBy).then(setMails)
    }, [filterBy, location])

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

    function onToggleStar(mailId) {
        mailService.get(mailId).then(mail => {
          mail.isStarred = !mail.isStarred
          mailService.save(mail).then(() => {
            // Refresh the state so the UI updates
            setMails(prevMails =>
              prevMails.map(m => m.id === mailId ? { ...m, isStarred: mail.isStarred } : m)
            )
          })
        })
      }


    return (
        <section className="flex">
            <MailFolderList onSetFilter={status => onSetFilter({ status })} selectedFolder={filterBy.status} />

            <section className="flex column mail-main">
                <MailFilter onSetFilter={onSetFilter} />

                <div className="mail-content-wrapper">
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onToggleStar={onToggleStar} isReadFilter={filterBy.isRead} />
                    <Outlet />
                </div>

            </section>
        </section>
    )
}