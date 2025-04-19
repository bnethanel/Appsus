import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isReadFilter, onToggleStar, onRemoveMail, onToggleRead, isStarredFilter}) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} isReadFilter={isReadFilter} isStarredFilter={isStarredFilter} onToggleStar={onToggleStar} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
            ))}
        </ul>
    )
}