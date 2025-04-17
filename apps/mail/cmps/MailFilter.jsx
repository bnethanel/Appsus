export function MailFilter({ onSetFilter }) {
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
        </section>
    )
}