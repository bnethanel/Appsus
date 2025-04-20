const { useNavigate } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, isReadFilter, onToggleStar, onRemoveMail, onToggleRead, isStarredFilter }) {
    const navigate = useNavigate()

    function onOpenMail() {
        if (mail.isDraft) {
            navigate('/mail/compose', { state: { draft: mail } })
        } else {
            mailService.markAsRead(mail.id)
                .then(() => navigate(`/mail/${mail.id}`))
                .catch(err => console.error('Failed to mark as read:', err))
        }
    }

    function handleToggleStar(ev) {
        ev.stopPropagation()
        onToggleStar(mail.id)
    }

     function onDeletePreviewMail(ev) {
         ev.stopPropagation() 
        onRemoveMail(mail.id)
    }

    function handleToggleRead(ev) {
        ev.stopPropagation()
        onToggleRead(mail.id)
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const now = new Date()
      
        // If it's this year, return like "Apr 17"
        if (date.getFullYear() === now.getFullYear()) {
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        }
      
        // Else, return "Apr 17, 2023"
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      }



    return (
        <li
            className={
                `mail-preview ${mail.isRead ? 'read' : 'unread'} ` +
                ((isReadFilter !== null && mail.isRead === isReadFilter ) ? 'highlight' : '') 
            }
            onClick={onOpenMail}
        >

            <button className="mail-preview-star" onClick={handleToggleStar}><i className={mail.isStarred ? "fa-solid fa-star active-star" : "fa-regular fa-star"} ></i></button>
            <span className="mail-from">{mail.from}</span>
            <span className="mail-subject">{mail.subject}</span>
            <span className="mail-snippet">{mail.body}</span>
            <span className="mail-time">{formatDate(mail.sentAt || mail.createdAt)}</span>

            <div className="mail-actions">
                <button className="mail-preview-btn-trash" title="Delete" onClick={onDeletePreviewMail}><i className="fa-solid fa-trash"></i></button>
                <button className="mail-preview-btn-unread" onClick={handleToggleRead} title={mail.isRead? "Mark as unread" : "Mark as read"}><i className={mail.isRead? "fa-regular fa-envelope" : "fa-solid fa-envelope-open"} ></i></button>
            </div>
        </li>
    )
}
