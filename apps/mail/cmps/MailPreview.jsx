const { useNavigate } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, isReadFilter, onToggleStar, onRemoveMail }) {
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



    return (
        <li
            className={
                `mail-preview ${mail.isRead ? 'read' : 'unread'} ` +
                ((isReadFilter !== null && mail.isRead === isReadFilter) ? 'highlight' : '')
            }
            onClick={onOpenMail}
        >

            <button className="mail-preview-star" onClick={handleToggleStar}><i className={mail.isStarred ? "fa-solid fa-star active-star" : "fa-regular fa-star"}></i></button>
            <span className="mail-from">{mail.from}</span>
            <span className="mail-subject">{mail.subject}</span>
            <span className="mail-snippet">{mail.body}</span>
            <span className="mail-time">2024-04-17</span> {/* will change later later */}

            <div className="mail-actions">
                <button className="mail-preview-btn-trash" onClick={onDeletePreviewMail}><i className="fa-solid fa-trash"></i></button>
                <button className="mail-preview-btn-unread"><i className="fa-regular fa-envelope"></i></button>
            </div>


            
        </li>
    )
}
