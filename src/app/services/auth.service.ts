import { Reader } from './../models/reader';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { firebase } from "@firebase/app";
import { auth } from "firebase";

import { Observable, of } from "rxjs";
import { switchMap, startWith, tap, filter } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  reader$: Observable<Reader | null>;
  reader: Reader | null;

  readerId: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.reader$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.readerId = user.uid
          return this.afs.doc<Reader>(`readers/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(user => localStorage.setItem('reader', JSON.stringify(user)))
      
      // startWith(JSON.parse(localStorage.getItem('user')))
    );

    this.reader$.pipe(
      filter(user => !!user)
    ).subscribe(user => {
      this.reader = user
      this.readerId = user.uid
    })
  }

  isOwner(id: string) {
    return id === this.readerId
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private oAuthLogin(provider: any) {
    
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  updateUser(reader: Reader) {
    const userRef: AngularFirestoreDocument<Reader> = this.afs.doc(
      `readers/${reader.uid}`
    );

    return userRef.update(reader).then(res => console.log('reader updated'))
  }

  
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }

  private handleError(error: Error) {
    console.error(error);
  }

  private updateUserData(user: Reader) {
    const userRef: AngularFirestoreDocument<Reader> = this.afs.doc(
      `readers/${user.uid}`
    );

    const data: Reader = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || "nameless user",
      photoURL: user.photoURL || "https://goo.gl/Fz9nrQ",
    };
    return userRef.valueChanges().subscribe(user => {
      if (!!user) {
        console.log('existing user')
        userRef.update({ ...data} );
      } else {
        console.log('new user')
        userRef.set(data);
      }
    })

  }
}
