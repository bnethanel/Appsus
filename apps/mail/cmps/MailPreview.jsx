const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    function onOpenMail() {
        navigate(`/mail/${mail.id}`)
    }

    return (
        <li className={`mail-preview ${mail.isRead ? 'read' : 'unread'}` } onClick={onOpenMail}>
            <span className="mail-from">{mail.from}</span>
            <span className="mail-subject">{mail.subject}</span>
            <span className="mail-snippet">{mail.body}</span>
            <span className="mail-time">2024-04-17</span> {/* will change later later */}
        </li>
    )
}
