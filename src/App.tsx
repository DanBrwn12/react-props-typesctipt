import etsy from './data/etsy.json';
import Listing from './components/Listing';
import type { ListingItem } from './components/Listing';
import './App.css';

const rawItems: unknown[] = etsy;

function isListingItem(value: unknown): value is ListingItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const hasId = 'listing_id' in value && typeof value.listing_id === 'number';

  const hasUrl = 'url' in value && typeof value.url === 'string';

  const hasMainImage =
    'MainImage' in value &&
    typeof value.MainImage === 'object' &&
    value.MainImage !== null &&
    'url_570xN' in value.MainImage &&
    typeof value.MainImage.url_570xN === 'string';

  const hasTitle = 'title' in value && typeof value.title === 'string';

  const hasCurrencyCode =
    'currency_code' in value && typeof value.currency_code === 'string';

  const hasPrice = 'price' in value && typeof value.price === 'string';
  const hasQuantity = 'quantity' in value && typeof value.quantity === 'number';

  return (
    hasId &&
    hasUrl &&
    hasMainImage &&
    hasTitle &&
    hasCurrencyCode &&
    hasPrice &&
    hasQuantity
  );
}

const validItems = rawItems.filter(isListingItem);

function App() {
  return (
    <div className="container">
      <Listing items={validItems} />
    </div>
  );
}

export default App;
