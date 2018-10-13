import { QuoteNote } from './quote-note';
import { Book } from './book';
import { User } from './user';
export class Reading {

    constructor(book: Book) {
        this.book = book
    }

    id: string
    userId: string
    book: Book
    quoteNotes: QuoteNote[]
    isPrivate: boolean
    owner: User
    members: User[]
}
