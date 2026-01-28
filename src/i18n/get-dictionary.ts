const dictionaries: any = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    es: () => import('./dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    console.log('getDictionary called for locale:', locale);
    const loader = dictionaries[locale] || dictionaries.en;
    try {
        const dict = await loader();
        console.log('Dictionary loaded successfully for:', locale);
        return dict;
    } catch (error) {
        console.error('Error loading dictionary for:', locale, error);
        throw error;
    }
};
