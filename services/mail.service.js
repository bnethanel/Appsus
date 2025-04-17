import { loadFromStorage, saveToStorage } from './util.service'
import { storageService } from './async-storage.service'


const MAIL_KEY = 'mailDB'
_createDemoMails()

export const mailService = {
    query,
    getLoggedinUser,
    // more functions will go here later like addMail, removeMail, etc.
}

function getLoggedinUser() {
    return loggedinUser
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY).then(mails => {
        if (!mails?.length) return []

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

        return mails
    })
}




const filterBy = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

const mail = {
    id: 'e101',
    createdAt: 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function _createDemoMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },

            {
                id: 'e102',
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}


