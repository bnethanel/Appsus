const { useState } = React

export function MailFilter({ onSetFilter }) {
    
    const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '', isRead: null })

    function handleChange(ev) {
        const { name, value } = ev.target
        let val = value

        
        if (name === 'isRead') {
            val = value === 'all' ? null : value === 'true'
        }

        
        const updatedFilter = { ...filterBy, [name]: val }
        setFilterBy(updatedFilter)

        
        onSetFilter(updatedFilter)
    }

    return (
        <section className="mail-filter">
            <input
                type="text"
                name="txt"
                placeholder="Search mail"
                value={filterBy.txt}
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
