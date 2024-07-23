export const accessTokenCookieOptions = {
    name: "accessToken",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    httpOnly: true,
    secure: true
};
