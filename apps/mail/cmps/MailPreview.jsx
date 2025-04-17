

export function MailPreview({ mail }) {
    return (
        <li className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
        <span className="mail-from">{mail.from}</span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-snippet">{mail.body}</span>
        <span className="mail-time">2024-04-17</span> {/* will change later later */}
    </li>
    )
}
