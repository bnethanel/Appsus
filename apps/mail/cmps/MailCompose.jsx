const { useState, useEffect } = React
const { useNavigate, useLocation } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export function MailCompose() {
  const navigate = useNavigate()
  const location = useLocation()
  const draft = location.state && location.state.draft

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  })

  useEffect(() => {
    if (draft) {
      setFormData({
        to: draft.to || '',
        subject: draft.subject || '',
        body: draft.body || ''
      })
    }
  }, [draft])

  
  
  

  function handleChange(ev) {
    const { name, value } = ev.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()

    const newMail = mailService.getEmptyMail(formData.to, formData.subject, formData.body)

    mailService.add(newMail).then(() => {
      navigate('/mail')  
    })
  }

  function onCloseCompose() {
    const hasContent = formData.to || formData.subject || formData.body
    if (hasContent) {
      const draft = mailService.getEmptyMail(formData.to, formData.subject, formData.body)
      draft.isDraft = true
      draft.sentAt = null

      mailService.add(draft)
    }

    navigate('/mail')
  }

  return (
    <section className="mail-compose-floating-panel">
      <div className="mail-compose-header flex space-between align-center">
        <span className="compose-header-message  ">New Message</span>
        
          <button className="mail-compose-close" onClick={onCloseCompose}>x</button>

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
