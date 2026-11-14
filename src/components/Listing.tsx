interface ItemMainImage {
  url_570xN: string;
}

export interface ListingItem {
  listing_id: number;
  url: string;
  MainImage: ItemMainImage;
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}

interface ListingProps {
  items?: ListingItem[];
}

function formatPrice(currencyCode: string): string {
  switch (currencyCode) {
    case 'USD':
      return '$';

    case 'EUR':
      return '€';

    case 'GBP':
      return '£';

    default:
      return `${currencyCode} `;
  }
}

function getStockClass(quantity: number): string {
  if (quantity <= 10) {
    return 'stock-low';
  } else if (quantity > 10 && quantity <= 20) {
    return 'stock-medium';
  }

  return 'stock-high';
}

function Listing({ items = [] }: ListingProps) {
  return (
    <div className="product-grid">
      {items.map((item) => (
        <div className="product-card" key={item.listing_id}>
          <img
            className="product-image"
            src={item.MainImage.url_570xN}
            alt={item.title}
          />
          <div className="product-info">
            <h3 className="product-title">
              {item.title.length > 50
                ? item.title.slice(0, 50) + '…'
                : item.title}
            </h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.currency_code)}
                {item.price}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Listing;
