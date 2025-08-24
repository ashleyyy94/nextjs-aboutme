import { NextResponse } from 'next/server';
import featureFlags from './config/featureFlags.json' assert { type: 'json' };

const routeToFeatureFlag = {
  '/about': 'about',
  '/collection': 'collection',
  '/experiments': 'experiments',
  '/three': 'three',
  '/toto': 'toto',
  '/futures-calculator': 'futuresCalculator',
  '/guestbook': 'guestbook',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const normalizedPath = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const featureFlagKey = Object.entries(routeToFeatureFlag).find(([route]) => {
    return normalizedPath === route || normalizedPath.startsWith(route + '/');
  })?.[1];

  if (featureFlagKey && !featureFlags.navigation[featureFlagKey]) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
