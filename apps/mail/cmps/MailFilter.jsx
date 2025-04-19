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
            <div className="mail-filter-search-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search mail"
                    className="mail-filter-search"
                    value={filterBy.txt}
                    onChange={handleChange}
                />
            </div>


            <select name="isRead" value={filterBy.isRead === null ? 'all' : String(filterBy.isRead)} onChange={handleChange} className="on-read-filter">
                <option value="all">All</option>
                <option value="false">Unread</option>
                <option value="true">Read</option>
            </select>
        </section>
    )
}
