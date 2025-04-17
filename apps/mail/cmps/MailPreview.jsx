const { useNavigate } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, isReadFilter }) {
    const navigate = useNavigate()

    function onOpenMail() {
        mailService.markAsRead(mail.id)
            .then(() => navigate(`/mail/${mail.id}`))
    }

    return (
        <li
            className={
                `mail-preview ${mail.isRead ? 'read' : 'unread'} ` +
                ((isReadFilter !== null && mail.isRead === isReadFilter) ? 'highlight' : '')
            }
            onClick={onOpenMail}
        >
            <span className="mail-from">{mail.from}</span>
            <span className="mail-subject">{mail.subject}</span>
            <span className="mail-snippet">{mail.body}</span>
            <span className="mail-time">2024-04-17</span> {/* will change later later */}
        </li>
    )
}
