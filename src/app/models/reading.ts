import { QuoteNote } from './quote-note';
import { Book } from './book';
import { Reader } from './reader';
export class Reading {

    constructor(book: Book) {
        this.book = book
    }

    book: Book
    quoteNotes: QuoteNote[]
    isPrivate: boolean
    owner: Reader
    members: Reader[]
}
