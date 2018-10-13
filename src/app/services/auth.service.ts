import { User } from "./../models/user";
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
  user$: Observable<User | null>;
  user: User | null;

  userId: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      tap( user => console.log('auth', user )),
      switchMap(user => {
        if (user) {
          console.log('setting userid', user.uid)
          this.userId = user.uid
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(user => localStorage.setItem('user', JSON.stringify(user)))
      
      // startWith(JSON.parse(localStorage.getItem('user')))
    );

    this.user$.pipe(
      filter(user => !!user)
    ).subscribe(user => {
      this.user = user
      this.userId = user.uid
    })
  }

  updateUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    return userRef.set(user).then(res => console.log('usesr updated'))
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

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user); // if using firestore
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

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || "nameless user",
      photoURL: user.photoURL || "https://goo.gl/Fz9nrQ",

    };
    return userRef.set(data);
  }
}
