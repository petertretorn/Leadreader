import { QuoteNote } from './quote-note';
import { Book } from './book';
import { Reader } from './reader';
export class Reading {

    constructor(book: Book) {
        this.book = book
    }

    id: string
    userId: string
    book: Book
    dateCreated: Date
    quoteNotes: QuoteNote[]
    isPrivate: boolean
    status: string
    owner: Reader
    members: Reader[]
}
