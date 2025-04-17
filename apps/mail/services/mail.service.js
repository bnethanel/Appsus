import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"




const MAIL_KEY = 'mailDB'
_createDemoMails()

export const mailService = {
    query,
    getLoggedinUser,
    get,
    remove,
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

function _createDemoMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e201',
                from: 'no-reply@github.com',
                to: 'user@appsus.com',
                subject: 'New push to your repository',
                body: 'You pushed changes to react-sprint3-starter.',
                isRead: false,
                removedAt: null,
                sentAt: Date.now() - 1000000
            },
            {
                id: 'e202',
                from: 'user@appsus.com',
                to: 'friend@gmail.com',
                subject: 'Lunch this weekend?',
                body: 'Hey! Want to grab lunch at the usual place this weekend?',
                isRead: true,
                removedAt: null,
                sentAt: Date.now() - 2000000
            },
            {
                id: 'e203',
                from: 'newsletter@dev.to',
                to: 'user@appsus.com',
                subject: 'Top React articles this week',
                body: 'Check out the most popular articles about React!',
                isRead: false,
                removedAt: null,
                sentAt: Date.now() - 3000000
            },
            {
                id: 'e204',
                from: 'hr@bigcompany.com',
                to: 'user@appsus.com',
                subject: 'Job Interview Feedback',
                body: 'We’re pleased to inform you that you made it to the next stage!',
                isRead: true,
                removedAt: null,
                sentAt: Date.now() - 4000000
            },
            {
                id: 'e205',
                from: 'user@appsus.com',
                to: 'momo@momo.com',
                subject: 'Thanks for your help',
                body: 'Just wanted to say thanks again for all your help with the project.',
                isRead: false,
                removedAt: null,
                sentAt: Date.now() - 5000000
            },
            {
                id: 'e206',
                from: 'cooldev@someemail.com',
                to: 'user@appsus.com',
                subject: 'This new JS library is 🔥',
                body: 'You have to check this out — blew my mind!',
                isRead: true,
                removedAt: null,
                sentAt: Date.now() - 6000000
            },
            {
                id: 'e207',
                from: 'user@appsus.com',
                to: 'team@school.edu',
                subject: 'Sprint 3 Submission',
                body: 'Please find my final project attached. Looking forward to feedback!',
                isRead: false,
                removedAt: null,
                sentAt: Date.now() - 7000000
            },
            {
                id: 'e208',
                from: 'billing@netflix.com',
                to: 'user@appsus.com',
                subject: 'Your monthly invoice',
                body: 'Your payment was successfully processed.',
                isRead: true,
                removedAt: null,
                sentAt: Date.now() - 8000000
            },
            {
                id: 'e209',
                from: 'meme.bot@funnyemails.com',
                to: 'user@appsus.com',
                subject: 'Friday Meme Drop',
                body: 'Enjoy your weekly dose of code memes 🤓',
                isRead: false,
                removedAt: null,
                sentAt: Date.now() - 9000000
            },
            {
                id: 'e210',
                from: 'user@appsus.com',
                to: 'mentor@devlife.com',
                subject: 'Update on my project',
                body: 'Just wanted to share that the mail app is really coming together!',
                isRead: true,
                removedAt: null,
                sentAt: Date.now() - 10000000
            }
            


        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


