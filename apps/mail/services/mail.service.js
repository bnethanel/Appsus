import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"




const MAIL_KEY = 'mailDB'


export const mailService = {
    query,
    getLoggedinUser,
    get,
    remove,
    markAsRead,
    getEmptyMail,
    save,
    add,
}

function getLoggedinUser() {
    return loggedinUser
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (!mail.removedAt) {
                mail.removedAt = Date.now()
                showSuccessMsg('Conversation moved to Trash.')
                return save(mail)
            } else {
                showSuccessMsg('Mail deleted')
                return storageService.remove(MAIL_KEY, mailId)
            }

        })
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

                case 'star':
                    mails = mails.filter(mail => mail.isStarred)
                    break
            }
        }

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail =>
                regex.test(mail.subject) || regex.test(mail.body)
            )
        }

        if (filterBy.sort === 'date-newest') {
            mails.sort((a, b) => b.sentAt - a.sentAt)
        } else if (filterBy.sort === 'date-oldest') {
            mails.sort((a, b) => a.sentAt - b.sentAt)
        } else if (filterBy.sort === 'subject-asc') {
            mails.sort((a, b) => a.subject.localeCompare(b.subject))
        } else if (filterBy.sort === 'subject-desc') {
            mails.sort((a, b) => b.subject.localeCompare(a.subject))
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

function add(mail) {
    return storageService.post(MAIL_KEY, mail)
}

function getEmptyMail(to = '', subject = '', body = '') {
    return {
        id: '',
        createdAt: Date.now(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        isStarred: false,
        removedAt: null,
        from: loggedinUser.email,
        isDraft: true,
        to
    }
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

function getRandomPastDate(yearsBack = 2) {
    const now = Date.now()
    const past = now - yearsBack * 365 * 24 * 60 * 60 * 1000 // X years back
    return new Date(past + Math.random() * (now - past)).getTime()
}

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
    "Hi there, I just wanted to follow up and see if you had a chance to review the proposal I sent last week.",
    "Thank you for your quick response. I’ve attached the updated document for your review.",
    "We’ve scheduled your appointment for next Thursday at 2:00 PM. Let us know if that works for you.",
    "Congratulations! You’ve been selected for the next stage of the interview process. Please check your calendar and book a time.",
    "This is a reminder that your subscription will expire in 3 days. Renew now to continue enjoying our services without interruption.",
    "I’m reaching out to confirm our meeting tomorrow morning. Please let me know if any changes come up.",
    "We noticed a new sign-in from an unrecognized device. If this was not you, please reset your password immediately.",
    "Hope you had a great weekend! Just wanted to check in on your progress with the draft report.",
    "Your package has been shipped and is on its way. You can track it using the link provided below.",
    "We’ve received your support request and a member of our team will get back to you shortly.",
    "It was great catching up earlier. I’ve added a few notes from our conversation in this email for your reference.",
    "Please review the attached invoice and let us know if you have any questions or concerns.",
    "We’re currently running a limited-time offer you might be interested in. Check it out before it ends!",
    "As requested, I’ve included the performance metrics from the last quarter in the attached file.",
    "Can you please confirm whether you’ll be attending the team lunch on Friday?",
    "Just a heads up that we’ll be performing scheduled maintenance this weekend, which may cause brief service interruptions.",
    "Thanks again for your feedback! It’s extremely helpful as we continue to improve our product.",
    "Attached you’ll find the minutes from last week's meeting, along with action items and deadlines.",
    "I'm sharing the presentation deck we discussed — feel free to comment or suggest changes.",
    "Our office will be closed next Monday for the holiday. We'll resume normal operations on Tuesday."
  ];
  

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

        for (let i = 0; i < 32; i++) {
            const isRead = Math.random() > 0.5
            const id = 'e' + (101 + i)
            const subject = demoSubjects[i % demoSubjects.length]
            const body = demoBodies[Math.floor(Math.random() * demoBodies.length)]
            const contactEmail = contacts[Math.floor(Math.random() * contacts.length)]
            const sentAt = getRandomPastDate()
            const createdAt = sentAt - Math.floor(Math.random() * 60000)

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


