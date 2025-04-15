export const slugify = (str: string) => {
    return str  
        .normalize('NFD')                       // decompose accents (é → e + ́)
        .replace(/[\u0300-\u036f]/g, '')        // remove diacritics
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')                   // spaces to hyphens
        .replace(/[^\w\-]+/g, '')               // remove non-word chars
        .replace(/\-\-+/g, '-');                // collapse multiple hyphen
}