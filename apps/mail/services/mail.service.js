import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"




const MAIL_KEY = 'mailDB'


export const mailService = {
    query,
    getLoggedinUser,
    get,
    remove,
    markAsRead,
    // addMail, removeMail, 
}

function getLoggedinUser() {
    return loggedinUser
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY).then(mails => {
        if (!mails || !mails.length) return []

        // Filter by the folder status
        if (filterBy.status) {
            switch (filterBy.status) {
                case 'inbox':
                    mails = mails.filter(mail =>
                        mail.to === loggedinUser.email && !mail.removedAt
                    )
                    break
                case 'sent':
                    mails = mails.filter(mail =>
                        mail.from === loggedinUser.email && !mail.removedAt
                    )
                    break
                case 'trash':
                    mails = mails.filter(mail =>
                        !!mail.removedAt
                    )
                    break
                case 'draft':
                    mails = mails.filter(mail => mail.isDraft)
                    break
            }
        }

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail =>
                regex.test(mail.subject) || regex.test(mail.body)
            )
        }

        return mails
    })
}

function markAsRead(mailId) {
    return get(mailId).then(mail => {
        mail.isRead = true
        return save(mail)  
    })
}

function save(mail) {
    return storageService.put(MAIL_KEY, mail)
}




// const filterBy = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
// }

// const mail = {
//     id: 'e101',
//     createdAt: 1551133930500,
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const demoSubjects = [
    'Meeting Tomorrow', 'Update Required', 'Family Dinner', 'Your Receipt',
    'Let’s Catch Up!', 'Congrats 🎉', 'Important Info', 'Schedule Change',
    'Job Offer', 'Invoice #554', 'Join us!', 'Happy Birthday!', 'New Device Login',
    'Security Alert', 'Your Order', 'Account Update', 'Password Changed',
    'New Comment', 'See You Soon', 'Flight Confirmed', 'Project Feedback',
    'Urgent: Reply Needed', 'Missed You', 'Welcome!', 'You’re Invited!'
  ]
  
  const demoBodies = [
    'Just wanted to check in.', 'Here is the info you asked for.',
    'Let me know what you think.', 'Thanks again!', 'Attached is the file.',
    'Please confirm receipt.', 'Are you coming tonight?',
    'This is a friendly reminder.', 'Following up on our chat.',
    'We appreciate your patience.'
  ]
  
  function _createDemoMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
      mails = []
  
      const contacts = [
        'elon@tesla.com', 'sara@work.com', 'no-reply@github.com',
        'mom@family.com', 'danny@school.edu', 'newsletter@react.dev',
        'bill@microsoft.com', 'friend@gmail.com', 'noreply@bank.com',
        'service@amazon.com', 'kate@travel.org', 'support@zoom.us',
        'tomer@appsus.com', 'marketing@startup.io', 'lee@funmail.com',
        'nina@events.co', 'support@airbnb.com', 'momo@momo.com',
        'sharon@design.co', 'offers@deals.com'
      ]
  
      for (let i = 0; i < 25; i++) {
        const isRead = Math.random() > 0.5
        const id = 'e' + (101 + i)
        const subject = demoSubjects[i % demoSubjects.length]
        const body = demoBodies[Math.floor(Math.random() * demoBodies.length)]
        const contactEmail = contacts[Math.floor(Math.random() * contacts.length)]
        const sentAt = Date.now() - Math.floor(Math.random() * 100000000)
        const createdAt = sentAt - 10000
  
        // 👇 Randomly decide if this mail is "inbox" or "sent"
        const isSentByUser = Math.random() > 0.5
  
        const from = isSentByUser ? loggedinUser.email : contactEmail
        const to = isSentByUser ? contactEmail : loggedinUser.email
  
        mails.push({
          id,
          createdAt,
          subject,
          body,
          isRead,
          sentAt,
          removedAt: null,
          from,
          to
        })
      }
  
      utilService.saveToStorage(MAIL_KEY, mails)
    }
  }
  
  
  _createDemoMails()


