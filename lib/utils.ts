import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice; 

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      } 

      return firstPrice || cleanPrice;
    }
  }

  return '';
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any): string {
    // Extracting description from common Amazon selectors
    const selectors = [
      '#feature-bullets .a-list-item',
      '#productDescription p',
      '.a-unordered-list .a-list-item'
    ];
  
    let description = '';
  
    selectors.forEach((selector) => {
      $(selector).each((i: number, el: any) => {
        const text = $(el).text().trim();
        if (text.length > 0 && !text.toLowerCase().includes('sort reviews by') && !text.match(/^\d(\.\d)?$/)) {
          description += `• ${text}\n`;
        }
      });
    });
  
    // Truncate to 300 words if necessary, ending at the next full stop
    const maxWords = 300;
    const words = description.split(/\s+/);
    if (words.length > maxWords) {
        let truncatedText = words.slice(0, maxWords).join(' ');
        const lastPeriodIndex = truncatedText.lastIndexOf('.');
    if (lastPeriodIndex !== -1) {
      truncatedText = truncatedText.slice(0, lastPeriodIndex + 1);
    }
    description = truncatedText + '...';
  }

  return description.trim();
  }
  

// Get reviews and stars
export function extractReviewsCount(...elements: any[]): string {
    for (const element of elements) {
      const text = element.text().trim();
      const count = text.replace(/[^0-9]/g, '');
      if (count) {
        // Remove duplication by taking the first half of the string
        return count.slice(0, count.length / 2);
      }
    }
    return '';
  }

  export function extractStars(...elements: any) {
    for (const element of elements) {
      // Get the rating text, usually in a format like "4.5 out of 5 stars"
      const ratingText = element.text().trim();
  
      if (ratingText) {
        // Extract the numeric value from the rating string
        const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
  
        if (ratingMatch) {
          return parseFloat(ratingMatch[0]);
        }
      }
    }
  
    return '';
  }
  
  export function extractFiveStarPercentage(...elements: any) {
    for (const element of elements) {
      // Get the text content that usually contains the percentage, like "80% 5 star"
      const percentageText = element.text().trim();
  
      if (percentageText) {
        // Extract the numeric percentage value (e.g., "80%")
        const percentageMatch = percentageText.match(/(\d+(\.\d+)?)%/);
  
        if (percentageMatch) {
          return parseFloat(percentageMatch[1]);
        }
      }
    }
  
    return '';
  }
  

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }
  
  return null;
};
export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
