const { useState } = React

export function MailFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({ txt: '', isRead: null })
    function handleChange(ev) {
        const { value } = ev.target
        onSetFilter(value)
    }

    return (
        <section className="mail-filter">
            <input
                type="text"
                placeholder="Search mail"
                onChange={handleChange}
            />

            <select name="isRead" value={filterBy.isRead === null ? 'all' : String(filterBy.isRead)} onChange={handleChange}>
                <option value="all">All</option>
                <option value="false">Unread</option>
                <option value="true">Read</option>
            </select>
        </section>
    )
}