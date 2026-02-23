export const getFullUrl = (relativePath) => {
    if (!relativePath) return null;

    // Normalize Windows backslashes to forward slashes
    let normalizedPath = relativePath.replace(/\\/g, '/');

    // Ensure it starts with a leading slash
    if (!normalizedPath.startsWith('/')) {
        normalizedPath = '/' + normalizedPath;
    }

    // Prepend server URL (fallback to localhost:3000 if not in env)
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    // Ensure we don't have double slashes
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // Encode special characters like spaces and brackets
    return encodeURI(`${cleanBaseUrl}${normalizedPath}`);
};

