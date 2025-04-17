import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, isReadFilter}) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} isReadFilter={isReadFilter} />
            ))}
        </ul>
    )
}