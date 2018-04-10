export class IsAuth {

  constructor(isAuthenticated, pathname) {
    this.isAuthenticated = !!isAuthenticated;
    this.pathname = pathname;
  }

  // Getter
  get EnterPublicPageAuth() {
    return this.calcuPublicPageAuth();
  }
  // Getter
  get EnterPrivatePageAuth() {
    return this.calcuPrivatePageAuth();
  }
  // Method
  calcuPublicPageAuth() {
    const unauthenticatedPages = ['/', '/signup'];
    const isUnauthenticatedPage = unauthenticatedPages.includes(this.pathname);
    if (isUnauthenticatedPage && this.isAuthenticated){
      return true;
    }
  }

  calcuPrivatePageAuth() {
    const authenticatedPages = ['/dashboard'];
    const isAuthenticatedPage = authenticatedPages.includes(this.pathname);
    if (isAuthenticatedPage && !this.isAuthenticated){
      return true;
    }
  }

}


  //!!Meteor.userId(); conversts to true or false

  //const isAuthenticated = !!Meteor.userId();
  //const pathname = history.location.pathname;
  //const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  //const isAuthenticatedPage = authenticatedPages.includes(pathname);
  //if (isUnauthenticatedPage && isAuthenticated){
  //  history.push('/link');
  //} else if (isAuthenticatedPage && !isAuthenticated){
  //  history.push('/');
//  }

  //const onEnterPublicPage = () => {
  //  if (Meteor.userId()){
      //should not view this page when logged in divert to link
  //    history.push('/link');
  //  }
  //};
  //const onEnterPrivatePage = () => {
    //if (!Meteor.userId()){
      //should not view this page when not logged in divert to /
    //  history.push('/');
    //  console.log('pushed it');
  //  }
  //};
