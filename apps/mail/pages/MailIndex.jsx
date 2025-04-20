const { useEffect, useState } = React
const { Outlet, useLocation } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '', sort: 'date-newest' })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const location = useLocation()
  console.log('Current sort method:', filterBy.sort)
  console.log('Filter passed to query:', filterBy)
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
            setMails(prevMails => {
                if (filterBy.status === 'star' && !mail.isStarred) {
                    return prevMails.filter(m => m.id !== mailId)
                }
                return prevMails.map(m => m.id === mailId ? { ...m, isStarred: mail.isStarred } : m)
            })
        })
    })
}

  function onToggleRead(mailId) {
    mailService.get(mailId).then(mail => {
      mail.isRead = !mail.isRead
      mailService.save(mail).then(() => {
        setMails(prevMails =>
          prevMails.map(m => m.id === mailId ? { ...m, isRead: mail.isRead } : m)
        )
      })
    })
  }


  return (
    <section className="flex">
      {/* <button className="hamburger-btn" onClick={() => setIsSidebarOpen(prev => !prev)}>
        <i className="fa-solid fa-bars"></i>
      </button> */}
      {/* <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}> */}
        <MailFolderList onSetFilter={status => onSetFilter({ status })} selectedFolder={filterBy.status} />
      {/* </aside> */}


      <section className="flex column mail-main">
        <MailFilter onSetFilter={onSetFilter} />

        <div className="mail-content-wrapper">
          <MailList mails={mails} onRemoveMail={onRemoveMail} onToggleStar={onToggleStar} isReadFilter={filterBy.isRead} isStarredFilter={filterBy.isStarred} onToggleRead={onToggleRead} />
          <Outlet />
        </div>

      </section>
    </section>
  )
}