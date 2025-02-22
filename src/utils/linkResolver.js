import { linkMap } from './linkMap';

const linkAliases = {
  'Benedictine': 'Bénédictine',
  'Green Chartreuse': 'Chartreuse',
  'Chartreuse Verde': 'Chartreuse',
  'Amaretto': 'Disaronno Amaretto',
  'Coffee Liqueur': 'Kahlua',
  'Licor de Café': 'Kahlua',
  'Liquore al Caffè': 'Kahlua',
  'Brandy de Albaricoque': 'Apricot Brandy',
  'Brandy di Albicocca': 'Apricot Brandy',
  'Averna': 'Amaro Averna',
  'Sweet Vermouth': 'Vermouth',
  'Sweet Red Vermouth': 'Vermouth',
  'Vermouth Dry': 'Vermouth',
  'Vermut': 'Vermouth',
  'Vermut Dulce': 'Vermouth',
  'Vermut Seco': 'Vermouth',
  'Vermut Dolce': 'Vermouth',
  'Vermú Dulce': 'Vermouth',
  'Vermú Seco': 'Vermouth',
  'Vermouth Dulce': 'Vermouth',
  'Vermouth Dolce': 'Vermouth',
  'Vermouth Rosso': 'Vermouth',
  'Vermouth Secco': 'Vermouth',
  'Dry Vermouth': 'Vermouth',
  'Passoã': 'Passoa',
  'Dubonnet Rouge': 'Dubonnet',
  'Whisky di Segale': 'Rye Whiskey',
  'Whisky de Centeno': 'Rye Whiskey',
  'Reposado Tequila': 'Tequila',
  'Tequila Reposado': 'Tequila',
  'Passion Fruit Liqueur': 'Passoa',
  'Licor de Maracuyá': 'Passoa',
  'Liquore al Frutto della Passione': 'Passoa',
  'Porto': 'Port',
  'Oporto': 'Port',
  'Cognac': 'Brandy',
  'Coñac': 'Brandy',
  'Ron': 'Rum',
  'Light Rum': 'Rum',
  'White Rum': 'Rum',
  'Rum Bianco': 'Rum',
  'Ron Blanco': 'Rum',
  'Champán': 'Champagne',
  'Ginebra': 'Gin',
  'Dry Gin': 'Gin',
  'Kahlúa': 'Kahlua',
  'Jägermeister': 'Jagermeister',
  'Jäger Bomb': 'Jager Bomb',
  'Hugo': 'Hugo Spritz',
  'Naked and Famous': 'Naked & Famous'
  // Add more aliases as needed
};

export function resolveInternalLink(linkText, currentLanguage = 'en') {
  // Check if this is an alias and get the main entry if it is
  const mainEntry = linkAliases[linkText] || linkText;

  const languageLinks = linkMap[mainEntry];
  // const languageLinks = linkMap[linkText];
  // console.log('resolveInternalLink currentLanguage:', currentLanguage);
  // console.log('resolveInternalLink linkText:', linkText);

  if (!languageLinks) {
    console.warn(`No link found for: ${linkText}`);
    return null;
  }
  // Get the URL for the current language or fallback to English
  const relativeUrl = languageLinks[currentLanguage] || languageLinks['en'];

  // Prepend the language prefix to the URL
  return `/${currentLanguage}${relativeUrl}`;
  // return languageLinks[currentLanguage] || languageLinks['en'];
}