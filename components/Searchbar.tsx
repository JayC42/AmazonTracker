"use client";
import Link from "next/link";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState, useEffect } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState("");
  const fullPlaceholder =
    "Paste your amazon link here (e.g., https://www.amazon.com/example)";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typewriterEffect = () => {
      if (index < fullPlaceholder.length) {
        setPlaceholder((prev) => prev + fullPlaceholder[index]);
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setPlaceholder("");
          setIndex(0);
        }, 2000);
      }
    };

    const timer = setTimeout(typewriterEffect, 90);
    return () => clearTimeout(timer);
  }, [index, fullPlaceholder]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) return alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      if (product?._id) {
        setProductId(product._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder={placeholder}
        className="searchbar-input"
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
