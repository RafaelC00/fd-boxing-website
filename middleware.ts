import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
    // Simple implementation: check Cookie, then Accept-Language, then default
    // For now, let's just use default or path
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    console.log('Middleware called for:', pathname);
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    console.log('pathnameIsMissingLocale:', pathnameIsMissingLocale);

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        console.log('Redirecting to locale:', locale);

        // e.g. incoming is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)'],
};
