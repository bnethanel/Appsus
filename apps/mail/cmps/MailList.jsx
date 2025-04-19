import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isReadFilter, onToggleStar, onRemoveMail, onToggleRead}) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} isReadFilter={isReadFilter} onToggleStar={onToggleStar} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
            ))}
        </ul>
    )
}