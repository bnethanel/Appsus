const { useState } = React
const { useNavigate } = ReactRouterDOM
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
    <section className="mail-compose">
      <h2>New Message</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  )
}
