const { Link } = ReactRouterDOM
export function MailFolderList({ onSetFilter, selectedFolder }) {
    console.log('selected foleder: ', selectedFolder)
    return (
        <aside className="mail-folder-list">
            <Link to="/mail/compose">
                <button className="compose-btn"><i className="fa-solid fa-pen"></i><span>Compose</span></button>
            </Link>
            <ul>
                <Link to="/mail">
                    <li ><button onClick={() => onSetFilter('inbox')} className={selectedFolder === 'inbox' ? 'active' : ''} Navigate><i className="fa-solid fa-inbox"></i><span className="btn-word">Inbox</span></button></li>
                </Link>

                <li ><button onClick={() => onSetFilter('star')} className={selectedFolder === 'star' ? 'active' : ''}><i className="fa-regular fa-star"></i><span className="btn-word">Starred</span></button></li>
                <li ><button onClick={() => onSetFilter('sent')} className={selectedFolder === 'sent' ? 'active' : ''}><i className="fa-solid fa-paper-plane"></i> <span className="btn-word">Sent</span></button></li>
                <li ><button onClick={() => onSetFilter('draft')} className={selectedFolder === 'draft' ? 'active' : ''}><i className="fa-regular fa-file"></i><span className="btn-word">Draft</span></button></li>
                <li ><button onClick={() => onSetFilter('trash')} className={selectedFolder === 'trash' ? 'active' : ''}><i className="fa-solid fa-trash"></i> <span className="btn-word">Trash</span></button></li>
            </ul>
        </aside>
    )
}