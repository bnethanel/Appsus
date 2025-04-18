const { Link } = ReactRouterDOM
export function MailFolderList({ onSetFilter }) {
    return (
        <aside className="mail-folder-list">
            <Link to="/mail/compose">
                <button className="compose-btn">✉️ Compose</button>
            </Link>
            <ul>
                <li><button onClick={() => onSetFilter('inbox')}>📥 Inbox</button></li>
                <li><button onClick={() => onSetFilter('sent')}>📤 Sent</button></li>
                <li><button onClick={() => onSetFilter('draft')}>📝 Draft</button></li>
                <li><button onClick={() => onSetFilter('trash')}>🗑 Trash</button></li>
            </ul>
        </aside>
    )
}