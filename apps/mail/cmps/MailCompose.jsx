const { useState } = React
const { useNavigate, Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export function MailCompose() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  })

  const navigate = useNavigate()

  function handleChange(ev) {
    const { name, value } = ev.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()

    const newMail = mailService.getEmptyMail(formData.to, formData.subject, formData.body)

    mailService.add(newMail).then(() => {
      navigate('/mail')  // back to inbox
    })
  }

  return (
    <section className="mail-compose-floating-panel">
      <div className="mail-compose-header flex space-between">
        <h2 >New Message</h2>
        
        <Link to="/mail">
          <button className="mail-compose-close">x</button>
        </Link>

      </div>

      <form onSubmit={onSubmit} className="compose-form">
        <input
          type="email"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          className="compose-to"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="compose-subject"
          required
        />
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="compose-body"
          required
        ></textarea>
        <button type="submit" className="compose-send">Send</button>
      </form>
    </section>
  )
}
