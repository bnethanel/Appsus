

export function MailPreview({ mail }) {
    return (
        <li className="mail-preview">
            <h4>{mail.subject}</h4>
            <p>{mail.body}</p>
            <small>From: {mail.from}</small>
        </li>
    )
}
