const { Link } = ReactRouterDOM
export function MailFolderList({ onSetFilter, selectedFolder }) {
    console.log('selected foleder: ', selectedFolder)
    return (
        <aside className="mail-folder-list">
            <Link to="/mail/compose">
                <button className="compose-btn"><i className="fa-solid fa-pen"></i> Compose</button>
            </Link>
            <ul>
                <Link to="/mail">
                    <li ><button onClick={() => onSetFilter('inbox')} className={selectedFolder === 'inbox' ? 'active' : ''} Navigate><i className="fa-solid fa-inbox"></i>Inbox</button></li>
                </Link>

                <li ><button onClick={() => onSetFilter('star')} className={selectedFolder === 'star' ? 'active' : ''}><i className="fa-regular fa-star"></i>Starred</button></li>
                <li ><button onClick={() => onSetFilter('sent')} className={selectedFolder === 'sent' ? 'active' : ''}><i className="fa-solid fa-paper-plane"></i> Sent</button></li>
                <li ><button onClick={() => onSetFilter('draft')} className={selectedFolder === 'draft' ? 'active' : ''}><i className="fa-regular fa-file"></i>Draft</button></li>
                <li ><button onClick={() => onSetFilter('trash')} className={selectedFolder === 'trash' ? 'active' : ''}><i className="fa-solid fa-trash"></i> Trash</button></li>
            </ul>
        </aside>
    )
}