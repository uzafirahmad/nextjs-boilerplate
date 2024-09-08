export default function sitemap() {
    const baseUrl = 'https://example.com';
    const currentDate = new Date();

    return [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/forgot-password`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
